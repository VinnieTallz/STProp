export interface AccessCode {
  id: string;
  name: string;
  code: string;
  type: 'ongoing' | 'one-time';
  isActive: boolean;
  createdAt: Date | string;
  deviceId?: string;
  status?: string;
}

export interface CreateAccessCodeRequest {
  name: string;
  code: string;
  type: 'ongoing' | 'one-time';
}

export interface AccessCodeDeleteResponse {
  deleted: boolean;
  lockId: string;
  codeId: string;
}