export interface Schedule {
  id: string;
  name: string;
  type: 'unlock' | 'lock';
  startTime: string; // HH:MM format
  endTime?: string; // HH:MM format
  daysOfWeek: number[]; // 0-6, Sunday = 0
  isActive: boolean;
  createdAt: Date;
  deviceId?: string;
  status?: string;
}

export interface CreateScheduleRequest {
  name: string;
  type: 'unlock' | 'lock';
  startTime: string;
  endTime?: string;
  daysOfWeek: number[];
  isActive?: boolean;
}

export interface UpdateScheduleRequest extends Partial<CreateScheduleRequest> {
  id: string;
}