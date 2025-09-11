import axios, { AxiosInstance } from 'axios';
import { Lock, Schedule, LockProvider, AccessCode } from '../types';
import { ConfigService } from '../services/ConfigService';
import { StorageService } from '../services/StorageService';

export class SeamProvider implements LockProvider {
  public readonly name = 'Seam';
  private client: AxiosInstance;
  private configService: ConfigService;
  private storageService: StorageService;

  constructor() {
    this.configService = ConfigService.getInstance();
    this.storageService = StorageService.getInstance();
    
    const config = this.configService.getSeamConfig();
    
    // Use proxy in development, direct API in production
    // TODO: Remove the api/seam proxy from vite when moving into production.
    const baseURL = import.meta.env.DEV 
      ? '/api/seam'  // This will be proxied to connect.getseam.com
      : 'https://connect.getseam.com';

    this.client = axios.create({
      baseURL,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[Seam API] ${config.method?.toUpperCase()} ${baseURL} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[Seam API] Request error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('[Seam API] Response error:', error.response?.data || error.message);
        this.logAuditEvent('API_ERROR', '', false, { error: error.message });
        return Promise.reject(error);
      }
    );
  }

  private async logAuditEvent(action: string, lockId: string, success: boolean, details: any = {}): Promise<void> {
    await this.storageService.addAuditLog({
      action,
      lockId,
      success,
      details: { provider: 'Seam', ...details }
    });
  }

  private mapSeamLockToLock(seamLock: any): Lock {
    // Safely extract values, handling nested objects
    const properties = seamLock.properties || {};
    const battery = properties.battery || {};
    
    // Convert battery level from decimal to percentage if needed
    let batteryLevel: number | undefined;
    if (typeof battery.level === 'number') {
      // If the value is between 0 and 1, it's likely a decimal (0.85 = 85%)
      batteryLevel = battery.level <= 1 ? Math.round(battery.level * 100) : battery.level;
    }
    
    return {
      id: seamLock.device_id,
      name: properties.name || seamLock.display_name || 'Unknown Lock',
      status: properties.locked ? 'locked' : 'unlocked',
      batteryLevel: batteryLevel,
      lastActivity: properties.last_seen_at ? new Date(properties.last_seen_at) : undefined,
      location: typeof properties.location === 'string' ? properties.location : undefined,
      model: typeof properties.model === 'string' ? properties.model : seamLock.device_type,
      manufacturer: typeof properties.manufacturer === 'string' ? properties.manufacturer : 
                    typeof seamLock.manufacturer_display_name === 'string' ? seamLock.manufacturer_display_name : 
                    'Unknown',
      isOnline: Boolean(properties.online),
      schedules: [], // Will be populated separately
      accessCodes: [] // Will be populated separately
    };
  }

  private mapSeamAccessCodeToAccessCode(seamCode: any): AccessCode {
    return {
      id: seamCode.access_code_id,
      name: seamCode.name || 'Unnamed Code',
      code: seamCode.code,
      type: seamCode.type === 'time_bound' ? 'one-time' : 'ongoing',
      // A code is active if it's being set or is already set on the device
      isActive: ['setting', 'set'].includes(seamCode.status),
      createdAt: new Date(seamCode.created_at),
    };
  }

  public async addAccessCode(lockId: string, accessCode: Omit<AccessCode, 'id' | 'createdAt'>): Promise<AccessCode> {
    // Seam's API uses 'time_bound' for what we call 'one-time'
    const seamType = accessCode.type === 'one-time' ? 'time_bound' : 'ongoing';

    // Assumes 'this.api' is your configured Axios instance for Seam
    const response = await this.client.post('/access_codes/create', {
      device_id: lockId,
      name: accessCode.name,
      code: accessCode.code,
      type: seamType,
    });

    if (!response.data.ok) {
      throw new Error(response.data.error?.message || 'Failed to create access code in Seam.');
    }

    const newSeamCode = response.data.access_code;

    // Map Seam's response to our internal AccessCode type
    return this.mapSeamAccessCodeToAccessCode(newSeamCode);
  }

  public async removeAccessCode(lockId: string, accessCodeId: string): Promise<boolean> {
    // Note: lockId is not required by the Seam API for deletion, but we include it for interface consistency.
    const response = await this.client.post('/access_codes/delete', {
      access_code_id: accessCodeId,
    });

    if (!response.data.ok) {
      throw new Error(response.data.error?.message || 'Failed to delete access code in Seam.');
    }

    return true;
  }

  public async getLocks(): Promise<Lock[]> {
    try {
      console.log('Fetching locks from Seam API...');
      const response = await this.client.get('/devices/list');
      console.log('Raw Seam response:', response.data);
      
      const seamLocks = response.data.devices || [];
      console.log('All devices:', seamLocks);
      
      // Debug: Log all device types found
      const deviceTypes = seamLocks.map((device: any) => ({
        id: device.device_id,
        type: device.device_type,
        name: device.display_name || device.properties?.name,
        manufacturer: device.properties?.manufacturer
      }));
      console.log('Device types found:', deviceTypes);
      
      const locks = seamLocks
        .filter((device: any) => {
          console.log(`Checking device ${device.device_id}: type="${device.device_type}"`);
          // TODO: Determine all device types from Schlage. 
          // return device.device_type === 'smart_lock';
          return device.device_type === 'schlage_lock';
        })
        .map((seamLock: any) => this.mapSeamLockToLock(seamLock));

      console.log('Filtered smart locks:', locks);

      // Load schedules and access codes for each lock
      for (const lock of locks) {
        try {
          // Fetch in parallel for efficiency
          const [schedules, accessCodes] = await Promise.all([
            this.getSchedules(lock.id),
            this.getAccessCodes(lock.id),
          ]);
          lock.schedules = schedules;
          lock.accessCodes = accessCodes;
        } catch (error) {
          console.warn(`Failed to load schedules or access codes for lock ${lock.id}:`, error);
          lock.schedules = []; // In case of error, ensure properties are arrays
          lock.accessCodes = [];
        }
      }

      console.log("saving locks to file.");
      await this.storageService.saveLocks(locks);
      await this.logAuditEvent('GET_LOCKS', '', true, { count: locks.length });
      
      return locks;
    } catch (error) {
      console.error('Failed to fetch locks:', error);
      await this.logAuditEvent('GET_LOCKS', '', false, { error: (error as Error).message });
      
      // Return cached data if available
      return await this.storageService.loadLocks();
    }
  }

  public async getLockStatus(lockId: string): Promise<Lock> {
    try {
      const response = await this.client.get(`/devices/get?device_id=${lockId}`);
      const seamLock = response.data.device;
      
      const lock = this.mapSeamLockToLock(seamLock);
      const [schedules, accessCodes] = await Promise.all([
        this.getSchedules(lockId),
        this.getAccessCodes(lockId),
      ]);
      lock.schedules = schedules;
      lock.accessCodes = accessCodes;
      
      await this.storageService.updateLock(lockId, lock);
      await this.logAuditEvent('GET_LOCK_STATUS', lockId, true);
      
      return lock;
    } catch (error) {
      console.error(`Failed to get lock status for ${lockId}:`, error);
      await this.logAuditEvent('GET_LOCK_STATUS', lockId, false, { error: (error as Error).message });
      throw error;
    }
  }

  public async lockDevice(lock: Lock): Promise<boolean> {
    console.group(`🔒 SeamProvider.lockDevice`);
    console.log('Lock ID:', lock.id);
    console.log('Lock Name:', lock.name);
    console.log('Can Remotely Lock:', lock.canRemotelyLock);
    console.log('Is Online:', lock.isOnline);
    
    // Pre-flight checks
    if (!lock.isOnline) {
      console.error('❌ Device is offline');
      console.groupEnd();
      throw new Error(`Device ${lock.name} is offline and cannot be controlled remotely`);
    }
    
    if (lock.canRemotelyLock === false) {
      console.error('❌ Device does not support remote locking');
      console.groupEnd();
      throw new Error(`Device ${lock.name} does not support remote locking`);
    }
    
    if (lock.status === 'locked') {
      console.warn('⚠️ Device is already locked');
      console.groupEnd();
      return true; // Already in desired state
    }
    
    try {
      const requestData = {
        device_id: lock.id
      };
      
      console.log('Request URL:', '/locks/lock_door');
      console.log('Request data:', requestData);
      console.log('Authorization header:', this.client.defaults.headers['Authorization']?.toString().substring(0, 20) + '...');
      
      const response = await this.client.post('/locks/lock_door', requestData);
      
      console.log('✅ Lock request successful');
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      
      await this.logAuditEvent('LOCK_DEVICE', lock.id, true, { 
        lockName: lock.name,
        manufacturer: lock.manufacturer,
        model: lock.model 
      });
      
      // Update local storage immediately with new status
      const updatedLock = {
        ...lock,
        status: 'locked' as const,
        lastActivity: new Date()
      };
      
      await this.storageService.updateLock(lock.id, updatedLock);
      
      console.groupEnd();
      return true;
    } catch (error: any) {
      console.error('❌ Lock request failed');
      console.error('Error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      console.error('Request config:', error.config);
      console.groupEnd();
      
      await this.logAuditEvent('LOCK_DEVICE', lock.id, false, { 
        error: error.message,
        lockName: lock.name 
      });
      throw error;
    }
  }

  public async unlockDevice(lock: Lock): Promise<boolean> {
    console.group(`🔓 SeamProvider.unlockDevice`);
    console.log('Lock ID:', lock.id);
    console.log('Lock Name:', lock.name);
    console.log('Can Remotely Unlock:', lock.canRemotelyUnlock);
    console.log('Is Online:', lock.isOnline);
    
    // Pre-flight checks
    if (!lock.isOnline) {
      console.error('❌ Device is offline');
      console.groupEnd();
      throw new Error(`Device ${lock.name} is offline and cannot be controlled remotely`);
    }
    
    if (lock.canRemotelyUnlock === false) {
      console.error('❌ Device does not support remote unlocking');
      console.groupEnd();
      throw new Error(`Device ${lock.name} does not support remote unlocking`);
    }
    
    if (lock.status === 'unlocked') {
      console.warn('⚠️ Device is already unlocked');
      console.groupEnd();
      return true; // Already in desired state
    }
    
    try {
      const requestData = {
        device_id: lock.id
      };
      
      console.log('Request URL:', '/locks/unlock_door');
      console.log('Request data:', requestData);
      console.log('Authorization header:', this.client.defaults.headers['Authorization']?.toString().substring(0, 20) + '...');
      
      const response = await this.client.post('/locks/unlock_door', requestData);
      
      console.log('✅ Unlock request successful');
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      
      await this.logAuditEvent('UNLOCK_DEVICE', lock.id, true, { 
        lockName: lock.name,
        manufacturer: lock.manufacturer,
        model: lock.model 
      });
      
      // Update local storage immediately with new status
      const updatedLock = {
        ...lock,
        status: 'unlocked' as const,
        lastActivity: new Date()
      };
      
      await this.storageService.updateLock(lock.id, updatedLock);
      
      console.groupEnd();
      return true;
    } catch (error: any) {
      console.error('❌ Unlock request failed');
      console.error('Error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      console.error('Request config:', error.config);
      console.groupEnd();
      
      await this.logAuditEvent('UNLOCK_DEVICE', lock.id, false, { 
        error: error.message,
        lockName: lock.name 
      });
      throw error;
    }
  }

  public async getAccessCodes(lockId: string): Promise<AccessCode[]> {
    try {
      const response = await this.client.get(`/access_codes/list?device_id=${lockId}`);
      const seamAccessCodes = response.data.access_codes || [];

      const accessCodes = seamAccessCodes.map((code: any) =>
        this.mapSeamAccessCodeToAccessCode(code)
      );

      await this.logAuditEvent('GET_ACCESS_CODES', lockId, true, { count: accessCodes.length });
      return accessCodes;
    } catch (error) {
      console.error(`Failed to get access codes for ${lockId}:`, error);
      await this.logAuditEvent('GET_ACCESS_CODES', lockId, false, { error: (error as Error).message });
      return [];
    }
  }

  public async getSchedules(lockId: string): Promise<Schedule[]> {
    try {
      // Note: Seam's access code scheduling might be different
      // This is a placeholder implementation
      const response = await this.client.get(`/access_codes/list?device_id=${lockId}`);
      const accessCodes = response.data.access_codes || [];
      
      const schedules: Schedule[] = accessCodes
        .filter((code: any) => code.type === 'time_bound')
        .map((code: any) => ({
          id: code.access_code_id,
          name: code.name || 'Scheduled Access',
          type: 'unlock' as const,
          startTime: code.starts_at ? new Date(code.starts_at).toTimeString().slice(0, 5) : '00:00',
          endTime: code.ends_at ? new Date(code.ends_at).toTimeString().slice(0, 5) : undefined,
          daysOfWeek: [1, 2, 3, 4, 5], // Default to weekdays
          isActive: code.status === 'set',
          createdAt: new Date(code.created_at)
        }));

      await this.logAuditEvent('GET_SCHEDULES', lockId, true, { count: schedules.length });
      return schedules;
    } catch (error) {
      console.error(`Failed to get schedules for ${lockId}:`, error);
      await this.logAuditEvent('GET_SCHEDULES', lockId, false, { error: (error as Error).message });
      return [];
    }
  }

  public async addSchedule(lockId: string, schedule: Omit<Schedule, 'id' | 'createdAt'>): Promise<Schedule> {
    try {
      // Create time-bound access code as a schedule
      const startDate = new Date();
      startDate.setHours(parseInt(schedule.startTime.split(':')[0]), parseInt(schedule.startTime.split(':')[1]));
      
      let endDate: Date | undefined;
      if (schedule.endTime) {
        endDate = new Date();
        endDate.setHours(parseInt(schedule.endTime.split(':')[0]), parseInt(schedule.endTime.split(':')[1]));
      }

      const response = await this.client.post('/access_codes/create', {
        device_id: lockId,
        name: schedule.name,
        type: 'time_bound',
        starts_at: startDate.toISOString(),
        ends_at: endDate?.toISOString(),
      });

      const newSchedule: Schedule = {
        id: response.data.access_code.access_code_id,
        ...schedule,
        createdAt: new Date()
      };

      await this.logAuditEvent('ADD_SCHEDULE', lockId, true, { scheduleName: schedule.name });
      return newSchedule;
    } catch (error) {
      console.error(`Failed to add schedule for ${lockId}:`, error);
      await this.logAuditEvent('ADD_SCHEDULE', lockId, false, { error: (error as Error).message });
      throw error;
    }
  }

  public async removeSchedule(lockId: string, scheduleId: string): Promise<boolean> {
    try {
      await this.client.post('/access_codes/delete', {
        access_code_id: scheduleId
      });
      
      await this.logAuditEvent('REMOVE_SCHEDULE', lockId, true, { scheduleId });
      return true;
    } catch (error) {
      console.error(`Failed to remove schedule ${scheduleId}:`, error);
      await this.logAuditEvent('REMOVE_SCHEDULE', lockId, false, { error: (error as Error).message });
      throw error;
    }
  }

  public async updateSchedule(lockId: string, scheduleId: string, schedule: Partial<Schedule>): Promise<Schedule> {
    try {
      // Seam doesn't support direct schedule updates, so we'll delete and recreate
      await this.removeSchedule(lockId, scheduleId);
      
      if (schedule.name && schedule.type && schedule.startTime && schedule.daysOfWeek) {
        return await this.addSchedule(lockId, {
          name: schedule.name,
          type: schedule.type,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          daysOfWeek: schedule.daysOfWeek,
          isActive: schedule.isActive ?? true
        });
      }
      
      throw new Error('Insufficient schedule data for update');
    } catch (error) {
      console.error(`Failed to update schedule ${scheduleId}:`, error);
      await this.logAuditEvent('UPDATE_SCHEDULE', lockId, false, { error: (error as Error).message });
      throw error;
    }
  }
}