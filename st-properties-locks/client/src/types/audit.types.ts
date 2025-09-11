export interface AuditLog {
  id: string;
  action: string;
  lockId: string;
  userId?: string;
  timestamp: Date;
  details: Record<string, any>;
  success: boolean;
}