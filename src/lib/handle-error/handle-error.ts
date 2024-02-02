import { ApiError } from '@/lib/errors';
import type {
  ApiResponse,
  ApiResponseErrorSeverities,
} from '../general-models';
import type { HandleErrorParams } from './params';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

export const handleError = ({ c, status = 400, error }: HandleErrorParams) => {
  let message = '';
  let severity: ApiResponseErrorSeverities = 'error';

  if (error instanceof ZodError) {
    const formatted = fromZodError(error).toString();
    message = formatted;
  } else if (error instanceof ApiError) {
    message = error.message;
    severity = error.severity;
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = 'Something went wrong! Try again later';
  }

  c.status(status);
  return c.json({
    success: false,
    errors: [
      {
        message,
        severity,
        raw: error,
      },
    ],
  } satisfies ApiResponse);
};
