import { ApiService } from './api.service';
import type { HealthResponse, DetailedHealthResponse, ApiResponse } from '../types';

export class HealthService {
  private static instance: HealthService;
  private apiService: ApiService;

  private constructor() {
    this.apiService = ApiService.getInstance();
  }

  public static getInstance(): HealthService {
    if (!HealthService.instance) {
      HealthService.instance = new HealthService();
    }
    return HealthService.instance;
  }

  /**
   * Basic health check
   */
  public async getHealth(): Promise<ApiResponse<HealthResponse>> {
    console.group('🏥 HealthService.getHealth');
    
    try {
      const response = await this.apiService.get<HealthResponse>('/api/health');
      console.log('Health status:', response.data?.status);
      console.groupEnd();
      return response;
    } catch (error) {
      console.error('Failed to get health status:', error);
      console.groupEnd();
      throw error;
    }
  }

  /**
   * Detailed health check
   */
  public async getDetailedHealth(): Promise<ApiResponse<DetailedHealthResponse>> {
    console.group('🔍 HealthService.getDetailedHealth');
    
    try {
      const response = await this.apiService.get<DetailedHealthResponse>('/api/health/detailed');
      console.log('Detailed health retrieved');
      console.groupEnd();
      return response;
    } catch (error) {
      console.error('Failed to get detailed health:', error);
      console.groupEnd();
      throw error;
    }
  }

  /**
   * Seam-specific health check
   */
  public async getSeamHealth(): Promise<ApiResponse<any>> {
    console.group('🔗 HealthService.getSeamHealth');
    
    try {
      const response = await this.apiService.get('/api/health/seam');
      console.log('Seam health retrieved');
      console.groupEnd();
      return response;
    } catch (error) {
      console.error('Failed to get Seam health:', error);
      console.groupEnd();
      throw error;
    }
  }
}