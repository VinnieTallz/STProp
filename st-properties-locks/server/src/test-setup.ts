import { vi } from 'vitest';

// Mock console methods to reduce test noise
global.console = {
  ...console,
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn(),
};

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.SEAM_API_KEY = 'test_seam_key_123456789';
process.env.SEAM_WORKSPACE_ID = 'test_workspace_123456789';
process.env.SEAM_ENVIRONMENT = 'sandbox';