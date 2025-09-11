import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import locksRouter from './locks.routes.js';

describe('Locks Routes', () => {
  let app: express.Express;

  beforeEach(() => {
    // Create a minimal Express app for testing just the locks routes
    app = express();
    app.use(express.json());
    
    // Add error handling middleware
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('Test error:', err);
      res.status(500).json({
        success: false,
        error: err.message,
        timestamp: new Date().toISOString()
      });
    });
    
    app.use('/api/locks', locksRouter);
  });

  describe('GET /api/locks', () => {
    it('should return a list of locks', async () => {
      const response = await request(app)
        .get('/api/locks')
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        data: expect.any(Array),
        timestamp: expect.any(String)
      });
      
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should return locks with required properties', async () => {
      const response = await request(app)
        .get('/api/locks')
        .expect(200);

      expect(response.body.success).toBe(true);
      
      if (response.body.data && response.body.data.length > 0) {
        const lock = response.body.data[0];
        expect(lock).toHaveProperty('id');
        expect(lock).toHaveProperty('name');
        expect(lock).toHaveProperty('status');
        expect(lock).toHaveProperty('isOnline');
        expect(['locked', 'unlocked', 'unknown']).toContain(lock.status);
      }
    });
  });

  describe('GET /api/locks/:id', () => {
    it('should return a specific lock by ID', async () => {
      const lockId = 'test-lock-123';
      
      const response = await request(app)
        .get(`/api/locks/${lockId}`)
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        data: expect.objectContaining({
          id: lockId,
          name: expect.any(String),
          status: expect.stringMatching(/^(locked|unlocked|unknown)$/),
          isOnline: expect.any(Boolean)
        }),
        timestamp: expect.any(String)
      });
    });

    it('should return 404 for non-existent lock', async () => {
      const response = await request(app)
        .get('/api/locks/non-existent-lock')
        .expect(404);

      expect(response.body).toMatchObject({
        success: false,
        error: expect.stringMatching(/not found/i),
        timestamp: expect.any(String)
      });
    });
  });

  describe('POST /api/locks/:id/lock', () => {
    it('should lock a device successfully', async () => {
      const lockId = 'test-lock-123';
      
      const response = await request(app)
        .post(`/api/locks/${lockId}/lock`)
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        data: expect.objectContaining({
          lockId: lockId,
          action: 'lock',
          status: 'locked',
          timestamp: expect.any(String)
        }),
        timestamp: expect.any(String)
      });
    });

    it('should handle lock operation failure for offline device', async () => {
      const lockId = 'offline-lock-456';
      
      const response = await request(app)
        .post(`/api/locks/${lockId}/lock`)
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        error: expect.stringMatching(/offline/i),
        timestamp: expect.any(String)
      });
    });
  });

  describe('POST /api/locks/:id/unlock', () => {
    it('should unlock a device successfully', async () => {
      const lockId = 'test-lock-123';
      
      const response = await request(app)
        .post(`/api/locks/${lockId}/unlock`)
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        data: expect.objectContaining({
          lockId: lockId,
          action: 'unlock',
          status: 'unlocked',
          timestamp: expect.any(String)
        }),
        timestamp: expect.any(String)
      });
    });
  });

  describe('Access Codes Routes', () => {
    describe('GET /api/locks/:id/access-codes', () => {
      it('should return access codes for a lock', async () => {
        const lockId = 'test-lock-123';
        
        const response = await request(app)
          .get(`/api/locks/${lockId}/access-codes`)
          .expect(200);

        expect(response.body).toMatchObject({
          success: true,
          data: expect.any(Array),
          timestamp: expect.any(String)
        });
      });
    });

    describe('POST /api/locks/:id/access-codes', () => {
      it('should create a new access code', async () => {
        const lockId = 'test-lock-123';
        const newAccessCode = {
          name: 'Test Guest Code',
          code: '5678',
          type: 'ongoing'
        };
        
        const response = await request(app)
          .post(`/api/locks/${lockId}/access-codes`)
          .send(newAccessCode)
          .expect(201);

        expect(response.body).toMatchObject({
          success: true,
          data: expect.objectContaining({
            id: expect.any(String),
            name: newAccessCode.name,
            code: newAccessCode.code
          }),
          timestamp: expect.any(String)
        });
      });

      it('should validate required fields', async () => {
        const lockId = 'test-lock-123';
        const invalidAccessCode = {
          name: 'Missing Code'
          // missing code field
        };
        
        const response = await request(app)
          .post(`/api/locks/${lockId}/access-codes`)
          .send(invalidAccessCode)
          .expect(400);

        expect(response.body).toMatchObject({
          success: false,
          error: expect.stringMatching(/required/i),
          timestamp: expect.any(String)
        });
      });
    });

    describe('DELETE /api/locks/:id/access-codes/:codeId', () => {
      it('should delete an access code', async () => {
        const lockId = 'test-lock-123';
        const codeId = 'code-456';
        
        const response = await request(app)
          .delete(`/api/locks/${lockId}/access-codes/${codeId}`)
          .expect(200);

        expect(response.body).toMatchObject({
          success: true,
          data: expect.objectContaining({
            deleted: true,
            lockId: lockId,
            codeId: codeId
          }),
          timestamp: expect.any(String)
        });
      });
    });
  });
});