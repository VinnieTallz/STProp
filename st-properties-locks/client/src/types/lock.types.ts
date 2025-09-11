export interface Lock {
  id: string;
  name: string;
  status: 'locked' | 'unlocked' | 'unknown';
  isOnline: boolean;
  
  // Optional hardware properties
  batteryLevel?: number;
  location?: string;
  model?: string;
  manufacturer?: string;
  
  // Seam-specific properties
  deviceType?: string;
  workspaceId?: string;
  connectedAccountId?: string;
  createdAt?: string;
  isManaged?: boolean;
  lastActivity?: Date;
  
  // Capability flags
  canRemotelyLock?: boolean;
  canRemotelyUnlock?: boolean;
  supportsAccessCodes?: boolean;
  hasBuiltInKeypad?: boolean;
  
  // Related data
  schedules: Schedule[];
  accessCodes: AccessCode[];
  capabilities: string[];
}

export interface LockActionResponse {
  lockId: string;
  action: 'lock' | 'unlock';
  status: 'locked' | 'unlocked';
  timestamp: string;
}

// Import types from other files
import type { Schedule } from './schedule.types';
import type { AccessCode } from './access-code.types';