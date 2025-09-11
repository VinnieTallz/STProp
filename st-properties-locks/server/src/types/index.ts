import { z } from 'zod';

// Health check response schema - updated to include connected field
export const HealthResponseSchema = z.object({
  status: z.literal('ok'),
  timestamp: z.string(),
  version: z.string(),
  environment: z.string(),
  seam: z.object({
    environment: z.string(),
    hasApiKey: z.boolean(),
    hasWorkspaceId: z.boolean(),
    connected: z.boolean(),
    error: z.string().optional()
  }),
});

// Basic API Response schema
export const ApiResponseSchema = <T>(dataSchema: z.ZodType<T>) => z.object({
  success: z.boolean(),
  data: dataSchema.optional(),
  error: z.string().optional(),
  timestamp: z.string(),
});

// Basic types for API responses
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
};

export type HealthResponse = z.infer<typeof HealthResponseSchema>;

// Extended AccessCode interface (defined first to avoid circular reference)
export interface AccessCode {
  id: string;
  name: string;
  code: string;
  type?: 'ongoing' | 'one-time';
  isActive?: boolean;
  createdAt?: string;
  deviceId?: string;
  status?: string;
}

// Extended Schedule interface (defined second to avoid circular reference)
export interface Schedule {
  id: string;
  name: string;
  type: 'lock' | 'unlock';
  startTime?: string;
  endTime?: string;
  daysOfWeek?: number[];
  isActive?: boolean;
  createdAt?: string;
  deviceId?: string;
}

// Extended Lock interface with all properties (defined last)
export interface Lock {
  id: string;
  name: string;
  status: 'locked' | 'unlocked' | 'unknown';
  isOnline: boolean;
  
  // Optional hardware properties - fixed for exactOptionalPropertyTypes
  batteryLevel?: number | undefined;
  location?: string | undefined;
  model?: string | undefined;
  manufacturer?: string | undefined;
  
  // Seam-specific properties
  deviceType?: string;
  workspaceId?: string;
  connectedAccountId?: string;
  createdAt?: string;
  isManaged?: boolean;
  
  // Capability flags
  canRemotelyLock?: boolean;
  canRemotelyUnlock?: boolean;
  supportsAccessCodes?: boolean;
  hasBuiltInKeypad?: boolean;
  
  // Required arrays (not optional to avoid exactOptionalPropertyTypes issues)
  schedules: Schedule[];
  accessCodes: AccessCode[];
  capabilities: string[];
}