import { ApiResponseErrorSeverities } from './api-response-error-severities';

export type ApiResponseError = {
  message: string;
  severity: ApiResponseErrorSeverities;
  raw?: unknown;
};
