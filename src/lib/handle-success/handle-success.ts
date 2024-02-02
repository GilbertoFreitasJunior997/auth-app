import type { ApiResponse } from '../general-models';
import type { HandleSuccessParams } from './params';

export const handleSuccess = <T>({
  c,
  status = 200,
  data,
}: HandleSuccessParams<T>) => {
  c.status(status);
  return c.json({
    success: true,
    data,
  } satisfies ApiResponse<T>);
};
