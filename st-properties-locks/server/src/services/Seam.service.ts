import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { config } from 'dotenv';

// Load environment variables
config();

export interface SeamLock {
  device_id: string;
  device_type: string;
  display_name: string;
  properties: {
    locked: boolean;
    online: boolean;
    battery_level?: number;
    model?: {
      display_name: string;
      manufacturer_display_name: string;
    };
  };
  location?: {
    location_name: string;
  };
  connected_account_id: string;
  workspace_id: string;
  created_at: string;
  is_managed: boolean;
}

export interface SeamAccessCode {
  access_code_id: string;
  device_id: string;
  name: string;
  code: string;
  type: string;
  status: string;
  created_at: string;
}

export interface SeamSchedule {
  schedule_id: string;
  device_id: string;
  name: string;
}

export class SeamService {
  private static instance: SeamService;
  private client: AxiosInstance;
  private apiKey: string;
  private workspaceId: string;
  private environment: string;
  private isTestMode: boolean;

  // Test data for mocking
  private mockLocks: SeamLock[] = [
    {
      device_id: 'test-lock-123',
      device_type: 'schlage_lock',
      display_name: 'Test Lock 1',
      properties: {
        locked: true,
        online: true,
        battery_level: 85,
        model: {
          display_name: 'Smart Lock Pro',
          manufacturer_display_name: 'Schlage'
        }
      },
      location: {
        location_name: 'Front Door'
      },
      connected_account_id: 'account_123',
      workspace_id: 'workspace_123',
      created_at: '2024-01-01T00:00:00Z',
      is_managed: true
    },
    {
      device_id: 'offline-lock-456',
      device_type: 'schlage_lock',
      display_name: 'Offline Test Lock',
      properties: {
        locked: false,
        online: false,
        battery_level: 20
      },
      connected_account_id: 'account_123',
      workspace_id: 'workspace_123',
      created_at: '2024-01-01T00:00:00Z',
      is_managed: true
    }
  ];

  private mockAccessCodes: SeamAccessCode[] = [
    {
      access_code_id: 'code-456',
      device_id: 'test-lock-123',
      name: 'Test Access Code',
      code: '1234',
      type: 'ongoing',
      status: 'set',
      created_at: '2024-01-01T00:00:00Z'
    }
  ];

  private constructor() {
    this.apiKey = process.env.SEAM_API_KEY || '';
    this.workspaceId = process.env.SEAM_WORKSPACE_ID || '';
    this.environment = process.env.SEAM_ENVIRONMENT || 'sandbox';
    this.isTestMode = process.env.NODE_ENV === 'test';

    // In test mode, don't require real API keys
    if (!this.isTestMode && (!this.apiKey || !this.workspaceId)) {
      throw new Error('SEAM_API_KEY and SEAM_WORKSPACE_ID must be set in environment variables');
    }

    const baseURL = this.environment === 'sandbox' 
      ? 'https://connect.getseam.com'
      : 'https://connect.getseam.com';

    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'seam-workspace': this.workspaceId,
      },
    });

    // Only add interceptors in non-test mode to reduce noise
    if (!this.isTestMode) {
      this.client.interceptors.request.use(
        (config) => {
          console.log(`[SeamAPI] ${config.method?.toUpperCase()} ${config.url}`);
          return config;
        },
        (error) => {
          console.error('[SeamAPI] Request error:', error.message);
          return Promise.reject(error);
        }
      );

      this.client.interceptors.response.use(
        (response) => {
          console.log(`[SeamAPI] Response: ${response.status} ${response.config.url}`);
          return response;
        },
        (error) => {
          console.error('[SeamAPI] Response error:', {
            status: error.response?.status,
            url: error.config?.url,
            message: error.response?.data?.message || error.message
          });
          return Promise.reject(error);
        }
      );
    }
  }

  public static getInstance(): SeamService {
    if (!SeamService.instance) {
      SeamService.instance = new SeamService();
    }
    return SeamService.instance;
  }

  // Device/Lock operations
  public async getDevices(): Promise<SeamLock[]> {
    if (this.isTestMode) {
      return Promise.resolve([...this.mockLocks]);
    }
    
    try {
      const response = await this.client.get('/devices/list', {
        params: {
          // device_type: 'smart_lock'
          // TODO: Expand the params to get all lock types.
          device_type: 'schlage_lock'
        }
      });
      return response.data.devices || [];
    } catch (error) {
      console.error('Failed to fetch devices from Seam:', error);
      throw new Error(`Failed to fetch devices: ${(error as Error).message}`);
    }
  }

  public async getDevice(deviceId: string): Promise<SeamLock | null> {
    if (this.isTestMode) {
      const device = this.mockLocks.find(lock => lock.device_id === deviceId);
      return Promise.resolve(device || null);
    }
    
    try {
      const response = await this.client.get('/devices/get', {
        params: { device_id: deviceId }
      });
      return response.data.device || null;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      console.error(`Failed to fetch device ${deviceId} from Seam:`, error);
      throw new Error(`Failed to fetch device: ${(error as Error).message}`);
    }
  }

  public async lockDevice(deviceId: string): Promise<boolean> {
    if (this.isTestMode) {
      const device = this.mockLocks.find(lock => lock.device_id === deviceId);
      if (!device) {
        throw new Error('Device not found');
      }
      if (!device.properties.online) {
        throw new Error('Device is offline and cannot be controlled remotely');
      }
      device.properties.locked = true;
      return Promise.resolve(true);
    }
    
    try {
      await this.client.post('/locks/lock_door', {
        device_id: deviceId
      });
      return true;
    } catch (error) {
      console.error(`Failed to lock device ${deviceId}:`, error);
      throw new Error(`Failed to lock device: ${(error as Error).message}`);
    }
  }

  public async unlockDevice(deviceId: string): Promise<boolean> {
    if (this.isTestMode) {
      const device = this.mockLocks.find(lock => lock.device_id === deviceId);
      if (!device) {
        throw new Error('Device not found');
      }
      if (!device.properties.online) {
        throw new Error('Device is offline and cannot be controlled remotely');
      }
      device.properties.locked = false;
      return Promise.resolve(true);
    }
    
    try {
      await this.client.post('/locks/unlock_door', {
        device_id: deviceId
      });
      return true;
    } catch (error) {
      console.error(`Failed to unlock device ${deviceId}:`, error);
      throw new Error(`Failed to unlock device: ${(error as Error).message}`);
    }
  }

  // Access Code operations
  public async getAccessCodes(deviceId: string): Promise<SeamAccessCode[]> {
    if (this.isTestMode) {
      const codes = this.mockAccessCodes.filter(code => code.device_id === deviceId);
      return Promise.resolve([...codes]);
    }
    
    try {
      const response = await this.client.get('/access_codes/list', {
        params: { device_id: deviceId }
      });
      return response.data.access_codes || [];
    } catch (error) {
      console.error(`Failed to fetch access codes for device ${deviceId}:`, error);
      throw new Error(`Failed to fetch access codes: ${(error as Error).message}`);
    }
  }

  public async createAccessCode(deviceId: string, accessCodeData: {
    name: string;
    code: string;
    type: 'ongoing' | 'time_bound';
  }): Promise<SeamAccessCode> {
    if (this.isTestMode) {
      const newCode: SeamAccessCode = {
        access_code_id: `code-${Date.now()}`,
        device_id: deviceId,
        name: accessCodeData.name,
        code: accessCodeData.code,
        type: accessCodeData.type,
        status: 'set',
        created_at: new Date().toISOString()
      };
      this.mockAccessCodes.push(newCode);
      return Promise.resolve(newCode);
    }
    
    try {
      const response = await this.client.post('/access_codes/create', {
        device_id: deviceId,
        ...accessCodeData
      });
      return response.data.access_code;
    } catch (error) {
      console.error(`Failed to create access code for device ${deviceId}:`, error);
      throw new Error(`Failed to create access code: ${(error as Error).message}`);
    }
  }

  public async deleteAccessCode(accessCodeId: string): Promise<boolean> {
    if (this.isTestMode) {
      const index = this.mockAccessCodes.findIndex(code => code.access_code_id === accessCodeId);
      if (index === -1) {
        throw new Error('Access code not found');
      }
      this.mockAccessCodes.splice(index, 1);
      return Promise.resolve(true);
    }
    
    try {
      await this.client.post('/access_codes/delete', {
        access_code_id: accessCodeId
      });
      return true;
    } catch (error) {
      console.error(`Failed to delete access code ${accessCodeId}:`, error);
      throw new Error(`Failed to delete access code: ${(error as Error).message}`);
    }
  }

  // Health check
  public async checkConnection(): Promise<boolean> {
    if (this.isTestMode) {
      return Promise.resolve(true);
    }
    
    try {
      await this.client.get('/health');
      return true;
    } catch (error) {
      console.error('Seam connection check failed:', error);
      return false;
    }
  }

  // Get configuration info
  public getConfig() {
    return {
      hasApiKey: !!this.apiKey,
      hasWorkspaceId: !!this.workspaceId,
      environment: this.environment,
      workspaceId: this.workspaceId ? `${this.workspaceId.substring(0, 8)}...` : 'not set',
      isTestMode: this.isTestMode
    };
  }
}