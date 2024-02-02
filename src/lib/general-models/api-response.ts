import type { ApiResponseError } from './api-response-error';

export type ApiResponse<T = never> = {
  success: boolean;
  errors?: ApiResponseError[];
  data?: T;
};
