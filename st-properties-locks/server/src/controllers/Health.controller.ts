import type { Request, Response } from 'express';
import { LockService, SeamService, DatabaseService } from '../services';
import type { HealthResponse } from '../types/index.js';

export class HealthController {
  private lockService: LockService;
  private seamService: SeamService;
  private databaseService: DatabaseService;

  constructor() {
    this.lockService = LockService.getInstance();
    this.seamService = SeamService.getInstance();
    this.databaseService = DatabaseService.getInstance();
  }

  /**
   * GET /api/health
   * Basic health check endpoint
   */
  public getHealth = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('🏥 HealthController.getHealth - Checking service health');
      
      // Check if services are operational through the abstracted service
      const healthResult = await this.lockService.checkHealth();
      const providerConfig = this.lockService.getProviderConfig();
      
      const response: HealthResponse = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        seam: {
          environment: providerConfig.environment,
          hasApiKey: providerConfig.hasApiKey,
          hasWorkspaceId: providerConfig.hasWorkspaceId,
          connected: healthResult.success && healthResult.data?.connected || false
        }
      };

      if (healthResult.success) {
        res.status(200).json(response);
      } else {
        response.status = 'error';
        response.seam.error = healthResult.error;
        res.status(503).json(response);
      }
    } catch (error) {
      console.error('💥 Exception in HealthController.getHealth:', error);
      
      const response: HealthResponse = {
        status: 'error',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        seam: {
          environment: 'unknown',
          hasApiKey: false,
          hasWorkspaceId: false,
          connected: false,
          error: (error as Error).message
        }
      };
      
      res.status(500).json(response);
    }
  };

  /**
   * GET /api/health/detailed
   * Detailed health check with service status
   */
  public getDetailedHealth = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('🔍 HealthController.getDetailedHealth - Performing detailed health check');
      
      const startTime = Date.now();
      
      // Test lock service
      const lockServiceResult = await this.lockService.checkHealth();
      
      // Test Seam connection
      const seamConnectionTest = await this.seamService.checkConnection();
      const seamConfig = this.seamService.getConfig();
      
      // Test database connection
      const databaseTest = await this.databaseService.healthCheck();
      
      const responseTime = Date.now() - startTime;
      
      const detailedResponse = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime(),
        responseTime: `${responseTime}ms`,
        services: {
          lockService: {
            status: lockServiceResult.success ? 'healthy' : 'unhealthy',
            connected: lockServiceResult.success && lockServiceResult.data?.connected || false,
            error: lockServiceResult.error || null
          },
          seam: {
            status: seamConnectionTest ? 'healthy' : 'unhealthy',
            environment: seamConfig.environment,
            hasApiKey: seamConfig.hasApiKey,
            hasWorkspaceId: seamConfig.hasWorkspaceId,
            connected: seamConnectionTest,
            workspaceId: seamConfig.workspaceId
          },
          database: {
            status: databaseTest.success ? 'healthy' : 'unhealthy',
            type: 'prisma',
            error: databaseTest.error || null
          }
        },
        system: {
          nodeVersion: process.version,
          platform: process.platform,
          arch: process.arch,
          memory: {
            used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
            total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
          }
        }
      };
      
      res.json(detailedResponse);
    } catch (error) {
      console.error('💥 Exception in HealthController.getDetailedHealth:', error);
      
      const errorResponse = {
        status: 'error',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        error: (error as Error).message,
        services: {
          lockService: { status: 'unknown' },
          seam: { status: 'unknown' },
          storage: { status: 'unknown' }
        }
      };
      
      res.status(503).json(errorResponse);
    }
  };

  /**
   * GET /api/health/seam
   * Seam-specific health check
   */
  public getSeamHealth = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('🔗 HealthController.getSeamHealth - Checking Seam API health');
      
      const startTime = Date.now();
      const seamConfig = this.seamService.getConfig();
      const connectionTest = await this.seamService.checkConnection();
      const responseTime = Date.now() - startTime;
      
      // Try to get device count for additional validation
      let deviceCount = 0;
      let deviceTestError = null;
      
      try {
        const devices = await this.seamService.getDevices();
        deviceCount = devices.length;
      } catch (error) {
        deviceTestError = (error as Error).message;
      }
      
      const seamHealthResponse = {
        status: connectionTest ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        responseTime: `${responseTime}ms`,
        configuration: {
          environment: seamConfig.environment,
          hasApiKey: seamConfig.hasApiKey,
          hasWorkspaceId: seamConfig.hasWorkspaceId,
          workspaceId: seamConfig.workspaceId
        },
        connection: {
          connected: connectionTest,
          lastTested: new Date().toISOString()
        },
        devices: {
          count: deviceCount,
          testError: deviceTestError
        }
      };
      
      const statusCode = connectionTest ? 200 : 503;
      console.log(`${connectionTest ? '✅' : '❌'} Seam health check completed`);
      
      res.status(statusCode).json(seamHealthResponse);
      
    } catch (error) {
      console.error('💥 Exception in HealthController.getSeamHealth:', error);
      
      const errorResponse = {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: (error as Error).message,
        configuration: {
          environment: 'unknown',
          hasApiKey: false,
          hasWorkspaceId: false
        },
        connection: {
          connected: false,
          lastTested: new Date().toISOString()
        }
      };
      
      res.status(503).json(errorResponse);
    }
  };
}