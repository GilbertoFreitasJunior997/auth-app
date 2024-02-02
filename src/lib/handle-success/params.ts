import type { ApiStatus } from '../general-models';
import type { Context } from 'hono';

export type HandleSuccessParams<T> = {
  c: Context;

  /**
   * @default 200
   */
  status?: ApiStatus;

  data?: T;
};
