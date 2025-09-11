import { describe, it, expect } from 'vitest';
import { 
  ApiResponseSchema, 
  HealthResponseSchema,
  type ApiResponse,
  type HealthResponse,
  type Lock,
  type AccessCode,
  type Schedule
} from './index.js';
import { z } from 'zod';

describe('Type Schemas', () => {
  describe('ApiResponseSchema', () => {
    it('should validate a successful response with string data', async () => {
      const StringResponseSchema = ApiResponseSchema(z.string());
      
      const validResponse = {
        success: true,
        data: 'test data',
        timestamp: '2024-01-01T00:00:00.000Z'
      };

      const result = StringResponseSchema.safeParse(validResponse);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.success).toBe(true);
        expect(result.data.data).toBe('test data');
        expect(result.data.timestamp).toBe('2024-01-01T00:00:00.000Z');
      }
    });

    it('should validate a successful response with array data', async () => {
      const ArrayResponseSchema = ApiResponseSchema(z.array(z.string()));
      
      const validResponse = {
        success: true,
        data: ['item1', 'item2'],
        timestamp: '2024-01-01T00:00:00.000Z'
      };

      const result = ArrayResponseSchema.safeParse(validResponse);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.data).toEqual(['item1', 'item2']);
      }
    });

    it('should validate an error response without data', async () => {
      const StringResponseSchema = ApiResponseSchema(z.string());
      
      const errorResponse = {
        success: false,
        error: 'Something went wrong',
        timestamp: '2024-01-01T00:00:00.000Z'
      };

      const result = StringResponseSchema.safeParse(errorResponse);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.success).toBe(false);
        expect(result.data.error).toBe('Something went wrong');
        expect(result.data.data).toBeUndefined();
      }
    });

    it('should validate response with both data and error (edge case)', async () => {
      const StringResponseSchema = ApiResponseSchema(z.string());
      
      const mixedResponse = {
        success: false,
        data: 'partial data',
        error: 'Partial failure',
        timestamp: '2024-01-01T00:00:00.000Z'
      };

      const result = StringResponseSchema.safeParse(mixedResponse);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.data).toBe('partial data');
        expect(result.data.error).toBe('Partial failure');
      }
    });

    it('should require success field', async () => {
      const StringResponseSchema = ApiResponseSchema(z.string());
      
      const invalidResponse = {
        // missing success field
        data: 'test data',
        timestamp: '2024-01-01T00:00:00.000Z'
      };

      const result = StringResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.path).toContain('success');
      }
    });

    it('should require timestamp field', async () => {
      const StringResponseSchema = ApiResponseSchema(z.string());
      
      const invalidResponse = {
        success: true,
        data: 'test data'
        // missing timestamp
      };

      const result = StringResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.path).toContain('timestamp');
      }
    });

    it('should reject invalid data type', async () => {
      const StringResponseSchema = ApiResponseSchema(z.string());
      
      const invalidResponse = {
        success: true,
        data: 123, // should be string
        timestamp: '2024-01-01T00:00:00.000Z'
      };

      const result = StringResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.path).toContain('data');
      }
    });

    it('should reject non-boolean success field', async () => {
      const StringResponseSchema = ApiResponseSchema(z.string());
      
      const invalidResponse = {
        success: 'true', // should be boolean
        data: 'test data',
        timestamp: '2024-01-01T00:00:00.000Z'
      };

      const result = StringResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.path).toContain('success');
      }
    });

    it('should reject non-string timestamp', async () => {
      const StringResponseSchema = ApiResponseSchema(z.string());
      
      const invalidResponse = {
        success: true,
        data: 'test data',
        timestamp: new Date() // should be string
      };

      const result = StringResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.path).toContain('timestamp');
      }
    });
  });

  describe('HealthResponseSchema', () => {
    it('should validate a valid health response', async () => {
      const validHealthResponse = {
        status: 'ok' as const,
        timestamp: '2024-01-01T00:00:00.000Z',
        version: '1.0.0',
        environment: 'development',
        seam: {
          environment: 'sandbox',
          hasApiKey: true,
          hasWorkspaceId: true,
          connected: true
        }
      };

      const result = HealthResponseSchema.safeParse(validHealthResponse);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.status).toBe('ok');
        expect(result.data.seam.hasApiKey).toBe(true);
        expect(result.data.seam.hasWorkspaceId).toBe(true);
        expect(result.data.seam.connected).toBe(true);
      }
    });

    it('should reject invalid status', async () => {
      const invalidHealthResponse = {
        status: 'error', // should be literal 'ok'
        timestamp: '2024-01-01T00:00:00.000Z',
        version: '1.0.0',
        environment: 'development',
        seam: {
          environment: 'sandbox',
          hasApiKey: true,
          hasWorkspaceId: true,
          connected: false
        }
      };

      const result = HealthResponseSchema.safeParse(invalidHealthResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.path).toContain('status');
      }
    });

    it('should require all seam fields', async () => {
      const incompleteHealthResponse = {
        status: 'ok' as const,
        timestamp: '2024-01-01T00:00:00.000Z',
        version: '1.0.0',
        environment: 'development',
        seam: {
          environment: 'sandbox'
          // missing hasApiKey, hasWorkspaceId, and connected
        }
      };

      const result = HealthResponseSchema.safeParse(incompleteHealthResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        const paths = result.error.issues.map(issue => issue.path.join('.'));
        expect(paths.some(path => path.includes('seam'))).toBe(true);
      }
    });

    it('should reject non-boolean seam flags', async () => {
      const invalidHealthResponse = {
        status: 'ok' as const,
        timestamp: '2024-01-01T00:00:00.000Z',
        version: '1.0.0',
        environment: 'development',
        seam: {
          environment: 'sandbox',
          hasApiKey: 'true', // should be boolean
          hasWorkspaceId: 'false', // should be boolean
          connected: 'true' // should be boolean
        }
      };

      const result = HealthResponseSchema.safeParse(invalidHealthResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        const paths = result.error.issues.map(issue => issue.path.join('.'));
        expect(paths.some(path => path.includes('hasApiKey'))).toBe(true);
        expect(paths.some(path => path.includes('hasWorkspaceId'))).toBe(true);
        expect(paths.some(path => path.includes('connected'))).toBe(true);
      }
    });

    it('should require seam object', async () => {
      const invalidHealthResponse = {
        status: 'ok' as const,
        timestamp: '2024-01-01T00:00:00.000Z',
        version: '1.0.0',
        environment: 'development'
        // missing seam object
      };

      const result = HealthResponseSchema.safeParse(invalidHealthResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.path).toContain('seam');
      }
    });
  });

  describe('TypeScript Interface Compatibility', () => {
    it('should be compatible with Lock interface', () => {
      const lock: Lock = {
        id: 'test-lock',
        name: 'Test Lock',
        status: 'locked',
        isOnline: true,
        schedules: [],
        accessCodes: [],
        capabilities: []
      };

      expect(lock.id).toBe('test-lock');
      expect(lock.name).toBe('Test Lock');
      expect(lock.status).toBe('locked');
      expect(lock.isOnline).toBe(true);
    });

    it('should be compatible with AccessCode interface', () => {
      const accessCode: AccessCode = {
        id: 'code-123',
        name: 'Guest Code',
        code: '1234'
      };

      expect(accessCode.id).toBe('code-123');
      expect(accessCode.name).toBe('Guest Code');
      expect(accessCode.code).toBe('1234');
    });

    it('should be compatible with Schedule interface', () => {
      const schedule: Schedule = {
        id: 'schedule-123',
        name: 'Morning Unlock',
        type: 'unlock'
      };

      expect(schedule.id).toBe('schedule-123');
      expect(schedule.name).toBe('Morning Unlock');
      expect(schedule.type).toBe('unlock');
    });

    it('should be compatible with ApiResponse interface', () => {
      const response: ApiResponse<string> = {
        success: true,
        data: 'test data',
        timestamp: '2024-01-01T00:00:00.000Z'
      };

      expect(response.success).toBe(true);
      expect(response.data).toBe('test data');
      expect(response.timestamp).toBe('2024-01-01T00:00:00.000Z');
    });

    it('should be compatible with HealthResponse interface', () => {
      const healthResponse: HealthResponse = {
        status: 'ok',
        timestamp: '2024-01-01T00:00:00.000Z',
        version: '1.0.0',
        environment: 'development',
        seam: {
          environment: 'sandbox',
          hasApiKey: true,
          hasWorkspaceId: true,
          connected: true
        }
      };

      expect(healthResponse.status).toBe('ok');
      expect(healthResponse.seam.hasApiKey).toBe(true);
      expect(healthResponse.seam.connected).toBe(true);
    });
  });

  describe('Real-world Data Scenarios', () => {
    it('should handle empty arrays in responses', () => {
      const ArrayResponseSchema = ApiResponseSchema(z.array(z.string()));
      
      const emptyArrayResponse = {
        success: true,
        data: [],
        timestamp: '2024-01-01T00:00:00.000Z'
      };

      const result = ArrayResponseSchema.safeParse(emptyArrayResponse);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.data).toEqual([]);
      }
    });

    it('should handle null data in error responses', () => {
      const StringResponseSchema = ApiResponseSchema(z.string());
      
      const nullDataResponse = {
        success: false,
        data: undefined, // explicitly undefined
        error: 'Resource not found',
        timestamp: '2024-01-01T00:00:00.000Z'
      };

      const result = StringResponseSchema.safeParse(nullDataResponse);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.data).toBeUndefined();
        expect(result.data.error).toBe('Resource not found');
      }
    });

    it('should handle different timestamp formats', () => {
      const StringResponseSchema = ApiResponseSchema(z.string());
      
      const isoTimestamp = {
        success: true,
        data: 'test',
        timestamp: '2024-01-01T12:30:45.123Z'
      };

      const result = StringResponseSchema.safeParse(isoTimestamp);
      expect(result.success).toBe(true);
    });

    it('should handle production vs development environment differences', () => {
      const prodHealthResponse = {
        status: 'ok' as const,
        timestamp: '2024-01-01T00:00:00.000Z',
        version: '1.2.3',
        environment: 'production',
        seam: {
          environment: 'production',
          hasApiKey: true,
          hasWorkspaceId: true,
          connected: true
        }
      };

      const devHealthResponse = {
        status: 'ok' as const,
        timestamp: '2024-01-01T00:00:00.000Z',
        version: '0.0.1',
        environment: 'development',
        seam: {
          environment: 'sandbox',
          hasApiKey: false,
          hasWorkspaceId: false,
          connected: false
        }
      };

      expect(HealthResponseSchema.safeParse(prodHealthResponse).success).toBe(true);
      expect(HealthResponseSchema.safeParse(devHealthResponse).success).toBe(true);
    });
  });

  describe('Error Message Quality', () => {
    it('should provide clear error messages for missing fields', () => {
      const StringResponseSchema = ApiResponseSchema(z.string());
      
      const incomplete = {};

      const result = StringResponseSchema.safeParse(incomplete);
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.issues;
        expect(errors.length).toBeGreaterThan(0);
        expect(errors.some(e => e.path.includes('success'))).toBe(true);
        expect(errors.some(e => e.path.includes('timestamp'))).toBe(true);
      }
    });

    it('should provide clear error messages for type mismatches', () => {
      const StringResponseSchema = ApiResponseSchema(z.number());
      
      const wrongType = {
        success: true,
        data: 'should be number',
        timestamp: '2024-01-01T00:00:00.000Z'
      };

      const result = StringResponseSchema.safeParse(wrongType);
      expect(result.success).toBe(false);
      if (!result.success) {
        const error = result.error.issues[0];
        expect(error?.path).toContain('data');
        expect(error?.code).toBe('invalid_type');
      }
    });
  });

  // ← ADDED: New test for connected field validation
  describe('Connected Field Validation', () => {
    it('should validate connected field in seam object', () => {
      const validHealthResponse = {
        status: 'ok' as const,
        timestamp: '2024-01-01T00:00:00.000Z',
        version: '1.0.0',
        environment: 'development',
        seam: {
          environment: 'sandbox',
          hasApiKey: true,
          hasWorkspaceId: true,
          connected: false // Test false value
        }
      };

      const result = HealthResponseSchema.safeParse(validHealthResponse);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.seam.connected).toBe(false);
      }
    });

    it('should reject missing connected field', () => {
      const invalidHealthResponse = {
        status: 'ok' as const,
        timestamp: '2024-01-01T00:00:00.000Z',
        version: '1.0.0',
        environment: 'development',
        seam: {
          environment: 'sandbox',
          hasApiKey: true,
          hasWorkspaceId: true
          // missing connected field
        }
      };

      const result = HealthResponseSchema.safeParse(invalidHealthResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        const paths = result.error.issues.map(issue => issue.path.join('.'));
        expect(paths.some(path => path.includes('connected'))).toBe(true);
      }
    });
  });
});