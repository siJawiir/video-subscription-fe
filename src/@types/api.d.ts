export interface ApiResponse<T> {
  error: string;
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export type ApiError = {
  success: false;
  message: string;
  error?: string;
};

export type AuditType = {
  created_at?: string;
  created_by?: number;
  updated_at?: string;
  updated_by?: number;
  deleted_at?: string;
  deleted_by?: number;
};

export type MutationResponse = {
  success: boolean;
  message?: string;
  error?: string;
};
