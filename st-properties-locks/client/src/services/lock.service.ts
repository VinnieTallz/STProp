import { ApiService } from './api.service';
import type { 
  Lock, 
  LockActionResponse, 
  ApiResponse,
  Schedule,
  CreateScheduleRequest,
  AccessCode,
  CreateAccessCodeRequest,
  AccessCodeDeleteResponse
} from '../types';

export class LockService {
  private static instance: LockService;
  private apiService: ApiService;

  private constructor() {
    this.apiService = ApiService.getInstance();
  }

  public static getInstance(): LockService {
    if (!LockService.instance) {
      LockService.instance = new LockService();
    }
    return LockService.instance;
  }

  /**
   * Get all locks
   */
  public async getLocks(): Promise<ApiResponse<Lock[]>> {
    console.group('🔍 LockService.getLocks');
    
    try {
      const response = await this.apiService.get<Lock[]>('/api/locks');
      console.log('Locks retrieved:', response.data?.length || 0);
      console.groupEnd();
      return response;
    } catch (error) {
      console.error('Failed to get locks:', error);
      console.groupEnd();
      throw error;
    }
  }

  /**
   * Get specific lock by ID
   */
  public async getLockById(lockId: string): Promise<ApiResponse<Lock>> {
    console.group(`🔍 LockService.getLockById(${lockId})`);
    
    try {
      const response = await this.apiService.get<Lock>(`/api/locks/${lockId}`);
      console.log('Lock retrieved:', response.data?.name);
      console.groupEnd();
      return response;
    } catch (error) {
      console.error('Failed to get lock:', error);
      console.groupEnd();
      throw error;
    }
  }

  /**
   * Lock a device
   */
  public async lockDevice(lockId: string): Promise<ApiResponse<LockActionResponse>> {
    console.group(`🔒 LockService.lockDevice(${lockId})`);
    
    try {
      const response = await this.apiService.post<LockActionResponse>(`/api/locks/${lockId}/lock`);
      console.log('Lock action result:', response.data);
      console.groupEnd();
      return response;
    } catch (error) {
      console.error('Failed to lock device:', error);
      console.groupEnd();
      throw error;
    }
  }

  /**
   * Unlock a device
   */
  public async unlockDevice(lockId: string): Promise<ApiResponse<LockActionResponse>> {
    console.group(`🔓 LockService.unlockDevice(${lockId})`);
    
    try {
      const response = await this.apiService.post<LockActionResponse>(`/api/locks/${lockId}/unlock`);
      console.log('Unlock action result:', response.data);
      console.groupEnd();
      return response;
    } catch (error) {
      console.error('Failed to unlock device:', error);
      console.groupEnd();
      throw error;
    }
  }

  /**
   * Get access codes for a lock
   */
  public async getAccessCodes(lockId: string): Promise<ApiResponse<AccessCode[]>> {
    console.group(`🔑 LockService.getAccessCodes(${lockId})`);
    
    try {
      const response = await this.apiService.get<AccessCode[]>(`/api/locks/${lockId}/access-codes`);
      console.log('Access codes retrieved:', response.data?.length || 0);
      console.groupEnd();
      return response;
    } catch (error) {
      console.error('Failed to get access codes:', error);
      console.groupEnd();
      throw error;
    }
  }

  /**
   * Create access code for a lock
   */
  public async createAccessCode(lockId: string, accessCode: CreateAccessCodeRequest): Promise<ApiResponse<AccessCode>> {
    console.group(`➕ LockService.createAccessCode(${lockId})`);
    console.log('Creating access code:', accessCode.name);
    
    try {
      const response = await this.apiService.post<AccessCode>(`/api/locks/${lockId}/access-codes`, accessCode);
      console.log('Access code created:', response.data?.id);
      console.groupEnd();
      return response;
    } catch (error) {
      console.error('Failed to create access code:', error);
      console.groupEnd();
      throw error;
    }
  }

  /**
   * Delete access code
   */
  public async deleteAccessCode(lockId: string, codeId: string): Promise<ApiResponse<AccessCodeDeleteResponse>> {
    console.group(`🗑️ LockService.deleteAccessCode(${lockId}, ${codeId})`);
    
    try {
      const response = await this.apiService.delete<AccessCodeDeleteResponse>(`/api/locks/${lockId}/access-codes/${codeId}`);
      console.log('Access code deleted:', response.data);
      console.groupEnd();
      return response;
    } catch (error) {
      console.error('Failed to delete access code:', error);
      console.groupEnd();
      throw error;
    }
  }

  /**
   * Get schedules for a lock (if your server supports this)
   */
  public async getSchedules(lockId: string): Promise<ApiResponse<Schedule[]>> {
    console.group(`📅 LockService.getSchedules(${lockId})`);
    
    try {
      const response = await this.apiService.get<Schedule[]>(`/api/locks/${lockId}/schedules`);
      console.log('Schedules retrieved:', response.data?.length || 0);
      console.groupEnd();
      return response;
    } catch (error) {
      console.error('Failed to get schedules:', error);
      console.groupEnd();
      throw error;
    }
  }

  /**
   * Create schedule for a lock (if your server supports this)
   */
  public async createSchedule(lockId: string, schedule: CreateScheduleRequest): Promise<ApiResponse<Schedule>> {
    console.group(`➕ LockService.createSchedule(${lockId})`);
    console.log('Creating schedule:', schedule.name);
    
    try {
      const response = await this.apiService.post<Schedule>(`/api/locks/${lockId}/schedules`, schedule);
      console.log('Schedule created:', response.data?.id);
      console.groupEnd();
      return response;
    } catch (error) {
      console.error('Failed to create schedule:', error);
      console.groupEnd();
      throw error;
    }
  }

  /**
   * Delete schedule (if your server supports this)
   */
  public async deleteSchedule(lockId: string, scheduleId: string): Promise<ApiResponse<boolean>> {
    console.group(`🗑️ LockService.deleteSchedule(${lockId}, ${scheduleId})`);
    
    try {
      const response = await this.apiService.delete<boolean>(`/api/locks/${lockId}/schedules/${scheduleId}`);
      console.log('Schedule deleted:', response.data);
      console.groupEnd();
      return response;
    } catch (error) {
      console.error('Failed to delete schedule:', error);
      console.groupEnd();
      throw error;
    }
  }
}