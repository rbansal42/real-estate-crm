export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

export interface QueryConfig {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface UserSettingsInput {
  name: string;
  email: string;
  phone: string;
  designation: string;
} 