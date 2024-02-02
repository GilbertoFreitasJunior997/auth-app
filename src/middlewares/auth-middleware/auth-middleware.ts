import { ApiError } from '@/lib/errors';
import { createMiddleware } from 'hono/factory';
import { decodeToken } from '@utils/token';
import { handleError } from '@/lib/handle-error';

export const authMiddleware = createMiddleware(async (c, next) => {
  try {
    const token = c.req.header('Authorization')?.split('Bearer ')[1];
    if (!token) {
      throw new ApiError('Invalid token');
    }

    const user = await decodeToken({
      token,
    });

    c.set('jwtPayload', user);

    return next();
  } catch (error) {
    return handleError({
      c,
      error,
      status: 401,
    });
  }
});
