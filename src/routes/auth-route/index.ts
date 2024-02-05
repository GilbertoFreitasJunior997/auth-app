import { ApiError } from '@/lib/errors';
import { handleError } from '@/lib/handle-error';
import { handleSuccess } from '@/lib/handle-success';
import { db } from '@/lib/prisma';
import {
  signinSchema,
  type SiginResponseSchema,
  signupSchema,
  type SignupResponseSchema,
} from '@schemas/auth';
import { arePasswordEquals, hashPassword } from '@utils/password';
import { createToken } from '@utils/token';
import { Hono } from 'hono';

export const authRoute = new Hono();

authRoute
  .post('signup', async (c) => {
    try {
      const body = await c.req.json();
      const { password, email } = signupSchema.parse(body);

      const emailExists = await db.users.findFirst({
        where: {
          email,
        },
      });

      if (emailExists) {
        throw new ApiError('Email already in use!');
      }

      const hashedPassword = await hashPassword({ password });

      const { password: _, ...newUser } = await db.users.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return handleSuccess<SignupResponseSchema>({
        c,
        status: 201,
        data: newUser,
      });
    } catch (error) {
      return handleError({
        c,
        error,
      });
    }
  })
  .post('signin', async (c) => {
    try {
      const body = await c.req.json();
      const { email, password } = signinSchema.parse(body);

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

      return handleSuccess<SiginResponseSchema>({
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
