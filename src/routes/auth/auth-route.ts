import { ApiError } from '@/lib/errors';
import { handleError } from '@/lib/handle-error';
import { handleSuccess } from '@/lib/handle-success';
import { db } from '@/lib/prisma';
import { loginSchema, type LoginResponseSchema } from '@schemas/auth';
import { arePasswordEquals } from '@utils/password';
import { createToken } from '@utils/token';
import { Hono } from 'hono';

export const authRoute = new Hono();

authRoute.post('login', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = loginSchema.parse(body);

    const user = await db.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ApiError('Email not found!');
    }

    const isPasswordValid = await arePasswordEquals({
      password,
      hashedPassword: user.password,
    });

    if (!isPasswordValid) {
      throw new ApiError('Invalid password');
    }

    const { password: _, ...tokenPayload } = user;
    const token = await createToken({
      payload: tokenPayload,
    });

    return handleSuccess<LoginResponseSchema>({
      c,
      data: {
        token,
      },
    });
  } catch (error) {
    return handleError({
      c,
      error,
    });
  }
});
