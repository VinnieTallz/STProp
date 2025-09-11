import type { Request, Response } from 'express';
import { LockService } from '../services';
import type { ApiResponse } from '../types/index.js';

export class LocksController {
  private lockService: LockService;

  constructor() {
    this.lockService = LockService.getInstance();
  }

  /**
   * GET /api/locks
   * Get all locks
   */
  public getLocks = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('🔍 LocksController.getLocks - Getting all locks');
      
      const result = await this.lockService.getLocks();
      
      if (result.success && result.data) {
        console.log(`✅ Successfully retrieved ${result.data.length} locks`);
        
        const response: ApiResponse<typeof result.data> = {
          success: true,
          data: result.data,
          timestamp: new Date().toISOString()
        };
        
        res.status(200).json(response);
      } else {
        console.error('❌ Failed to get locks:', result.error);
        
        const response: ApiResponse<never> = {
          success: false,
          error: result.error || 'Failed to retrieve locks',
          timestamp: new Date().toISOString()
        };
        
        res.status(500).json(response);
      }
    } catch (error) {
      console.error('💥 Exception in LocksController.getLocks:', error);
      
      const response: ApiResponse<never> = {
        success: false,
        error: (error as Error).message,
        timestamp: new Date().toISOString()
      };
      
      res.status(500).json(response);
    }
  };

  /**
   * GET /api/locks/:id
   * Get specific lock by ID
   */
  public getLockById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      if (!id) {
        const response: ApiResponse<never> = {
          success: false,
          error: 'Lock ID is required',
          timestamp: new Date().toISOString()
        };
        res.status(400).json(response);
        return;
      }

      console.log(`🔍 LocksController.getLockById - Getting lock ${id}`);
      
      const result = await this.lockService.getLockById(id);
      
      if (result.success && result.data) {
        console.log(`✅ Successfully retrieved lock ${id}`);
        
        const response: ApiResponse<typeof result.data> = {
          success: true,
          data: result.data,
          timestamp: new Date().toISOString()
        };
        
        res.status(200).json(response);
      } else {
        console.error(`❌ Failed to get lock ${id}:`, result.error);
        
        const statusCode = result.error === 'Lock not found' ? 404 : 500;
        const response: ApiResponse<never> = {
          success: false,
          error: result.error || 'Failed to retrieve lock',
          timestamp: new Date().toISOString()
        };
        
        res.status(statusCode).json(response);
      }
    } catch (error) {
      console.error('💥 Exception in LocksController.getLockById:', error);
      
      const response: ApiResponse<never> = {
        success: false,
        error: (error as Error).message,
        timestamp: new Date().toISOString()
      };
      
      res.status(500).json(response);
    }
  };

  /**
   * POST /api/locks/:id/lock
   * Lock a device
   */
  public lockDevice = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      if (!id) {
        const response: ApiResponse<never> = {
          success: false,
          error: 'Lock ID is required',
          timestamp: new Date().toISOString()
        };
        res.status(400).json(response);
        return;
      }

      console.log(`🔒 LocksController.lockDevice - Locking device ${id}`);
      
      const result = await this.lockService.lockDevice(id);
      
      if (result.success && result.data) {
        console.log(`✅ Successfully locked device ${id}`);
        
        const response: ApiResponse<typeof result.data> = {
          success: true,
          data: result.data,
          timestamp: new Date().toISOString()
        };
        
        res.status(200).json(response);
      } else {
        console.error(`❌ Failed to lock device ${id}:`, result.error);
        
        const statusCode = result.error === 'Lock not found' ? 404 : 400;
        const response: ApiResponse<never> = {
          success: false,
          error: result.error || 'Failed to lock device',
          timestamp: new Date().toISOString()
        };
        
        res.status(statusCode).json(response);
      }
    } catch (error) {
      console.error('💥 Exception in LocksController.lockDevice:', error);
      
      const response: ApiResponse<never> = {
        success: false,
        error: (error as Error).message,
        timestamp: new Date().toISOString()
      };
      
      res.status(500).json(response);
    }
  };

  /**
   * POST /api/locks/:id/unlock
   * Unlock a device
   */
  public unlockDevice = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      if (!id) {
        const response: ApiResponse<never> = {
          success: false,
          error: 'Lock ID is required',
          timestamp: new Date().toISOString()
        };
        res.status(400).json(response);
        return;
      }

      console.log(`🔓 LocksController.unlockDevice - Unlocking device ${id}`);
      
      const result = await this.lockService.unlockDevice(id);
      
      if (result.success && result.data) {
        console.log(`✅ Successfully unlocked device ${id}`);
        
        const response: ApiResponse<typeof result.data> = {
          success: true,
          data: result.data,
          timestamp: new Date().toISOString()
        };
        
        res.status(200).json(response);
      } else {
        console.error(`❌ Failed to unlock device ${id}:`, result.error);
        
        const statusCode = result.error === 'Lock not found' ? 404 : 400;
        const response: ApiResponse<never> = {
          success: false,
          error: result.error || 'Failed to unlock device',
          timestamp: new Date().toISOString()
        };
        
        res.status(statusCode).json(response);
      }
    } catch (error) {
      console.error('💥 Exception in LocksController.unlockDevice:', error);
      
      const response: ApiResponse<never> = {
        success: false,
        error: (error as Error).message,
        timestamp: new Date().toISOString()
      };
      
      res.status(500).json(response);
    }
  };

  /**
   * GET /api/locks/:id/access-codes
   * Get access codes for a lock
   */
  public getAccessCodes = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      if (!id) {
        const response: ApiResponse<never> = {
          success: false,
          error: 'Lock ID is required',
          timestamp: new Date().toISOString()
        };
        res.status(400).json(response);
        return;
      }

      console.log(`🔍 LocksController.getAccessCodes - Getting access codes for lock ${id}`);
      
      const result = await this.lockService.getAccessCodes(id);
      
      if (result.success && result.data) {
        console.log(`✅ Successfully retrieved ${result.data.length} access codes for lock ${id}`);
        
        const response: ApiResponse<typeof result.data> = {
          success: true,
          data: result.data,
          timestamp: new Date().toISOString()
        };
        
        res.status(200).json(response);
      } else {
        console.error(`❌ Failed to get access codes for lock ${id}:`, result.error);
        
        const response: ApiResponse<never> = {
          success: false,
          error: result.error || 'Failed to retrieve access codes',
          timestamp: new Date().toISOString()
        };
        
        res.status(500).json(response);
      }
    } catch (error) {
      console.error('💥 Exception in LocksController.getAccessCodes:', error);
      
      const response: ApiResponse<never> = {
        success: false,
        error: (error as Error).message,
        timestamp: new Date().toISOString()
      };
      
      res.status(500).json(response);
    }
  };

  /**
   * POST /api/locks/:id/access-codes
   * Create access code for a lock
   */
  public createAccessCode = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, code, type } = req.body;
      
      if (!id) {
        const response: ApiResponse<never> = {
          success: false,
          error: 'Lock ID is required',
          timestamp: new Date().toISOString()
        };
        res.status(400).json(response);
        return;
      }

      if (!name || !code) {
        const response: ApiResponse<never> = {
          success: false,
          error: 'Name and code are required',
          timestamp: new Date().toISOString()
        };
        res.status(400).json(response);
        return;
      }

      if (type && !['ongoing', 'one-time'].includes(type)) {
        const response: ApiResponse<never> = {
          success: false,
          error: 'Type must be either "ongoing" or "one-time"',
          timestamp: new Date().toISOString()
        };
        res.status(400).json(response);
        return;
      }

      console.log(`➕ LocksController.createAccessCode - Creating access code for lock ${id}`);
      
      const result = await this.lockService.createAccessCode(id, {
        name: name.trim(),
        code: code.trim(),
        type: type || 'ongoing'
      });
      
      if (result.success && result.data) {
        console.log(`✅ Successfully created access code for lock ${id}`);
        
        const response: ApiResponse<typeof result.data> = {
          success: true,
          data: result.data,
          timestamp: new Date().toISOString()
        };
        
        res.status(201).json(response);
      } else {
        console.error(`❌ Failed to create access code for lock ${id}:`, result.error);
        
        const response: ApiResponse<never> = {
          success: false,
          error: result.error || 'Failed to create access code',
          timestamp: new Date().toISOString()
        };
        
        res.status(400).json(response);
      }
    } catch (error) {
      console.error('💥 Exception in LocksController.createAccessCode:', error);
      
      const response: ApiResponse<never> = {
        success: false,
        error: (error as Error).message,
        timestamp: new Date().toISOString()
      };
      
      res.status(500).json(response);
    }
  };

  /**
   * DELETE /api/locks/:id/access-codes/:codeId
   * Delete access code
   */
  public deleteAccessCode = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, codeId } = req.params;
      
      if (!id || !codeId) {
        const response: ApiResponse<never> = {
          success: false,
          error: 'Lock ID and code ID are required',
          timestamp: new Date().toISOString()
        };
        res.status(400).json(response);
        return;
      }

      console.log(`🗑️ LocksController.deleteAccessCode - Deleting access code ${codeId} for lock ${id}`);
      
      const result = await this.lockService.deleteAccessCode(id, codeId);
      
      if (result.success && result.data) {
        console.log(`✅ Successfully deleted access code ${codeId}`);
        
        const response: ApiResponse<typeof result.data> = {
          success: true,
          data: result.data,
          timestamp: new Date().toISOString()
        };
        
        res.status(200).json(response);
      } else {
        console.error(`❌ Failed to delete access code ${codeId}:`, result.error);
        
        const response: ApiResponse<never> = {
          success: false,
          error: result.error || 'Failed to delete access code',
          timestamp: new Date().toISOString()
        };
        
        res.status(400).json(response);
      }
    } catch (error) {
      console.error('💥 Exception in LocksController.deleteAccessCode:', error);
      
      const response: ApiResponse<never> = {
        success: false,
        error: (error as Error).message,
        timestamp: new Date().toISOString()
      };
      
      res.status(500).json(response);
    }
  };
}