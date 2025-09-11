import { SeamService } from './Seam.service';
import type { Lock, AccessCode, Schedule, ApiResponse } from '../types';

export class LockService {
  private static instance: LockService;
  private seamService: SeamService;

  private constructor() {
    this.seamService = SeamService.getInstance();
  }

  public static getInstance(): LockService {
    if (!LockService.instance) {
      LockService.instance = new LockService();
    }
    return LockService.instance;
  }

  /**
   * Get all locks - abstracts the provider implementation
   */
  public async getLocks(): Promise<{ success: boolean; data?: Lock[]; error?: string }> {
    try {
      console.log('🔍 LockService.getLocks - Getting devices from provider');
      
      // Get raw devices from the provider (Seam in this case)
      const seamLocks = await this.seamService.getDevices();
      
      if (!Array.isArray(seamLocks)) {
        console.error('❌ Provider returned invalid data:', seamLocks);
        return {
          success: false,
          error: 'Invalid response from lock provider'
        };
      }

      // Transform provider-specific data to our generic Lock format
      const locks: Lock[] = await Promise.all(seamLocks.map(async (seamLock) => {
        try {
          // Get access codes for this lock
          const accessCodes = await this.seamService.getAccessCodes(seamLock.device_id);
          
          // Transform to our generic format
          return {
            id: seamLock.device_id,
            name: seamLock.display_name || 'Unknown Lock',
            status: seamLock.properties.locked ? 'locked' : 'unlocked' as 'locked' | 'unlocked',
            isOnline: seamLock.properties.online || false,
            batteryLevel: seamLock.properties.battery_level,
            location: seamLock.location?.location_name,
            model: seamLock.properties.model?.display_name,
            manufacturer: seamLock.properties.model?.manufacturer_display_name,
            deviceType: seamLock.device_type,
            workspaceId: seamLock.workspace_id,
            connectedAccountId: seamLock.connected_account_id,
            createdAt: seamLock.created_at,
            isManaged: seamLock.is_managed,
            canRemotelyLock: true,
            canRemotelyUnlock: true,
            supportsAccessCodes: true,
            hasBuiltInKeypad: true,
            schedules: [], // TODO: Implement schedules when needed
            accessCodes: accessCodes.map(code => ({
              id: code.access_code_id,
              name: code.name,
              code: code.code,
              type: code.type as 'ongoing' | 'one-time',
              isActive: code.status === 'set',
              createdAt: code.created_at,
              deviceId: code.device_id,
              status: code.status
            })),
            capabilities: []
          };
        } catch (error) {
          console.error(`❌ Failed to process lock ${seamLock.device_id}:`, error);
          
          // Return basic lock without access codes if there's an error
          return {
            id: seamLock.device_id,
            name: seamLock.display_name || 'Unknown Lock',
            status: seamLock.properties.locked ? 'locked' : 'unlocked' as 'locked' | 'unlocked',
            isOnline: seamLock.properties.online || false,
            batteryLevel: seamLock.properties.battery_level,
            location: seamLock.location?.location_name,
            model: seamLock.properties.model?.display_name,
            manufacturer: seamLock.properties.model?.manufacturer_display_name,
            deviceType: seamLock.device_type,
            workspaceId: seamLock.workspace_id,
            connectedAccountId: seamLock.connected_account_id,
            createdAt: seamLock.created_at,
            isManaged: seamLock.is_managed,
            canRemotelyLock: true,
            canRemotelyUnlock: true,
            supportsAccessCodes: true,
            hasBuiltInKeypad: true,
            schedules: [],
            accessCodes: [],
            capabilities: []
          };
        }
      }));

      console.log(`✅ LockService.getLocks - Successfully processed ${locks.length} locks`);
      
      return {
        success: true,
        data: locks
      };
    } catch (error) {
      console.error('💥 LockService.getLocks - Exception:', error);
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }

  /**
   * Get specific lock by ID
   */
  public async getLockById(lockId: string): Promise<{ success: boolean; data?: Lock; error?: string }> {
    try {
      console.log(`🔍 LockService.getLockById - Getting lock ${lockId}`);
      
      const seamLock = await this.seamService.getDevice(lockId);
      
      if (!seamLock) {
        return {
          success: false,
          error: 'Lock not found'
        };
      }

      // Get access codes for this lock
      const accessCodes = await this.seamService.getAccessCodes(lockId);
      
      // Transform to our generic format
      const lock: Lock = {
        id: seamLock.device_id,
        name: seamLock.display_name || 'Unknown Lock',
        status: seamLock.properties.locked ? 'locked' : 'unlocked' as 'locked' | 'unlocked',
        isOnline: seamLock.properties.online || false,
        batteryLevel: seamLock.properties.battery_level,
        location: seamLock.location?.location_name,
        model: seamLock.properties.model?.display_name,
        manufacturer: seamLock.properties.model?.manufacturer_display_name,
        deviceType: seamLock.device_type,
        workspaceId: seamLock.workspace_id,
        connectedAccountId: seamLock.connected_account_id,
        createdAt: seamLock.created_at,
        isManaged: seamLock.is_managed,
        canRemotelyLock: true,
        canRemotelyUnlock: true,
        supportsAccessCodes: true,
        hasBuiltInKeypad: true,
        schedules: [], // TODO: Implement schedules
        accessCodes: accessCodes.map(code => ({
          id: code.access_code_id,
          name: code.name,
          code: code.code,
          type: code.type as 'ongoing' | 'one-time',
          isActive: code.status === 'set',
          createdAt: code.created_at,
          deviceId: code.device_id,
          status: code.status
        })),
        capabilities: []
      };

      return {
        success: true,
        data: lock
      };
    } catch (error) {
      console.error(`💥 LockService.getLockById - Exception:`, error);
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }

  /**
   * Lock a device
   */
  public async lockDevice(deviceId: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      console.log(`🔒 LockService.lockDevice - Locking device ${deviceId}`);
      
      const success = await this.seamService.lockDevice(deviceId);
      
      return {
        success: true,
        data: {
          lockId: deviceId,
          action: 'lock' as const,
          status: 'locked' as const,
          timestamp: new Date().toISOString(),
          success: true
        }
      };
    } catch (error) {
      console.error(`💥 LockService.lockDevice - Exception:`, error);
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }

  /**
   * Unlock a device
   */
  public async unlockDevice(deviceId: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      console.log(`🔓 LockService.unlockDevice - Unlocking device ${deviceId}`);
      
      const success = await this.seamService.unlockDevice(deviceId);
      
      return {
        success: true,
        data: {
          lockId: deviceId,
          action: 'unlock' as const,
          status: 'unlocked' as const,
          timestamp: new Date().toISOString(),
          success: true
        }
      };
    } catch (error) {
      console.error(`💥 LockService.unlockDevice - Exception:`, error);
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }

  /**
   * Get access codes for a lock
   */
  public async getAccessCodes(deviceId: string): Promise<{ success: boolean; data?: any[]; error?: string }> {
    try {
      console.log(`🔑 LockService.getAccessCodes - Getting access codes for device ${deviceId}`);
      
      const seamAccessCodes = await this.seamService.getAccessCodes(deviceId);
      
      // Transform to our generic format
      const accessCodes = seamAccessCodes.map(code => ({
        id: code.access_code_id,
        name: code.name,
        code: code.code,
        type: code.type as 'ongoing' | 'one-time',
        isActive: code.status === 'set',
        createdAt: code.created_at,
        deviceId: code.device_id,
        status: code.status
      }));

      return {
        success: true,
        data: accessCodes
      };
    } catch (error) {
      console.error(`💥 LockService.getAccessCodes - Exception:`, error);
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }

  /**
   * Create access code
   */
  public async createAccessCode(deviceId: string, accessCodeData: any): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      console.log(`➕ LockService.createAccessCode - Creating access code for device ${deviceId}`);
      
      const seamAccessCode = await this.seamService.createAccessCode(deviceId, accessCodeData);
      
      // Transform to our generic format
      const accessCode = {
        id: seamAccessCode.access_code_id,
        name: seamAccessCode.name,
        code: seamAccessCode.code,
        type: seamAccessCode.type as 'ongoing' | 'one-time',
        isActive: seamAccessCode.status === 'set',
        createdAt: seamAccessCode.created_at,
        deviceId: seamAccessCode.device_id,
        status: seamAccessCode.status
      };

      return {
        success: true,
        data: accessCode
      };
    } catch (error) {
      console.error(`💥 LockService.createAccessCode - Exception:`, error);
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }

  /**
   * Delete access code
   */
  public async deleteAccessCode(deviceId: string, accessCodeId: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      console.log(`🗑️ LockService.deleteAccessCode - Deleting access code ${accessCodeId}`);
      
      const success = await this.seamService.deleteAccessCode(accessCodeId);
      
      return {
        success: true,
        data: {
          deleted: true,
          lockId: deviceId,
          codeId: accessCodeId
        }
      };
    } catch (error) {
      console.error(`💥 LockService.deleteAccessCode - Exception:`, error);
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }

  /**
   * Health check - abstracts provider health
   */
  public async checkHealth(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const connected = await this.seamService.checkConnection();
      return {
        success: true,
        data: { connected }
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }

  /**
   * Get provider configuration info
   */
  public getProviderConfig() {
    return this.seamService.getConfig();
  }
}