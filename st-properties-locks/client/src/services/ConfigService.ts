export class ConfigService {
  private static instance: ConfigService;
  private config: Record<string, string> = {};

  private constructor() {
    this.loadConfig();
  }

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  private loadConfig(): void {
    // Load from environment variables or localStorage
    this.config = {
      SEAM_API_KEY: localStorage.getItem('SEAM_API_KEY') || import.meta.env.VITE_SEAM_API_KEY || '',
      SEAM_ENVIRONMENT: localStorage.getItem('SEAM_ENVIRONMENT') || import.meta.env.VITE_SEAM_ENVIRONMENT || 'sandbox',
      SEAM_WORKSPACE_ID: localStorage.getItem('SEAM_WORKSPACE_ID') || import.meta.env.VITE_SEAM_WORKSPACE_ID || '',
    };
  }

  public get(key: string): string {
    return this.config[key] || '';
  }

  public set(key: string, value: string): void {
    this.config[key] = value;
    localStorage.setItem(key, value);
  }

  public isConfigured(): boolean {
    return !!(this.get('SEAM_API_KEY') && this.get('SEAM_WORKSPACE_ID'));
  }

  public getSeamConfig() {
    return {
      apiKey: this.get('SEAM_API_KEY'),
      environment: this.get('SEAM_ENVIRONMENT') as 'sandbox' | 'production',
      workspaceId: this.get('SEAM_WORKSPACE_ID'),
    };
  }

  public validateApiKey(apiKey: string): boolean {
    // Basic validation for Seam API key format
    return apiKey.startsWith('seam_') && apiKey.length > 20;
  }
}