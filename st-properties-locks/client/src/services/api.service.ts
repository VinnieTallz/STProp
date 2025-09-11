import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiResponse } from '../types';

export class ApiService {
  private static instance: ApiService;
  private client: AxiosInstance;
  private baseURL: string;

  private constructor() {
    this.baseURL = import.meta.env.DEV 
      ? '' // Use relative URLs - will be proxied by Vite
      : import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';
    
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[API] Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`[API] Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('[API] Response error:', {
          status: error.response?.status,
          url: error.config?.url,
          message: error.response?.data?.error || error.message
        });
        return Promise.reject(error);
      }
    );
  }

  /**
   * Generic GET request
   */
  public async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.get(endpoint, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Generic POST request
   */
  public async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Generic PUT request
   */
  public async put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Generic PATCH request
   */
  public async patch<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.patch(endpoint, data, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Generic DELETE request
   */
  public async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.delete(endpoint, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Handle API errors and return consistent error response
   */
  private handleError<T>(error: any): ApiResponse<T> {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data;
      
      return {
        success: false,
        error: apiError?.error || error.message,
        timestamp: new Date().toISOString()
      };
    }

    return {
      success: false,
      error: error.message || 'Unknown error occurred',
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Get base URL for debugging
   */
  public getBaseURL(): string {
    return this.baseURL;
  }

  /**
   * Update base URL if needed
   */
  public setBaseURL(url: string): void {
    this.baseURL = url;
    this.client.defaults.baseURL = url;
  }
}