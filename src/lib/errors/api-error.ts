import type { ApiResponseErrorSeverities } from '../general-models';

export class ApiError extends Error {
  constructor(
    public message = 'Something went wrong! Try again later',
    public severity: ApiResponseErrorSeverities = 'error',
  ) {
    super(message);
  }
}
