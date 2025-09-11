export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface HealthResponse {
  status: 'ok' | 'error';
  timestamp: string;
  version: string;
  environment: string;
  seam: {
    environment: string;
    hasApiKey: boolean;
    hasWorkspaceId: boolean;
    connected: boolean;
    error?: string;
  };
}

export interface DetailedHealthResponse extends HealthResponse {
  uptime: number;
  responseTime: string;
  services: {
    lockService: {
      status: 'healthy' | 'unhealthy';
      connected: boolean;
      error?: string;
    };
    seam: {
      status: 'healthy' | 'unhealthy';
      environment: string;
      hasApiKey: boolean;
      hasWorkspaceId: boolean;
      connected: boolean;
      workspaceId?: string;
    };
    storage: {
      status: 'healthy' | 'unhealthy';
      type: string;
    };
  };
  system: {
    nodeVersion: string;
    platform: string;
    arch: string;
    memory: {
      used: string;
      total: string;
    };
  };
}