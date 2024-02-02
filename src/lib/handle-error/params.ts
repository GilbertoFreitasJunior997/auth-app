import type { ApiStatus } from '../general-models';
import type { Context } from 'hono';

export type HandleErrorParams = {
  c: Context;
  error: unknown;

  /**
   * @default 400
   */
  status?: ApiStatus;
};
