import { ApiError } from '@/lib/errors';
import { handleError } from '@/lib/handle-error';
import { handleSuccess } from '@/lib/handle-success';
import { db } from '@/lib/prisma';
import { createUserSchema, type GetUserSchema } from '@schemas/user';
import { excludeKeys } from '@utils/exclude-keys';
import { hashPassword } from '@utils/password';
import { Hono } from 'hono';

export const userRoute = new Hono();

userRoute
  .get(async (c) => {
    try {
      const dbUsers = await db.users.findMany();
      const users = dbUsers.map((user) => excludeKeys(user, ['password']));

      return handleSuccess<GetUserSchema[]>({
        c,
        data: users,
      });
    } catch (error) {
      return handleError({
        c,
        error,
      });
    }
  })
  .post(async (c) => {
    try {
      const body = await c.req.json();
      const { password, email } = createUserSchema.parse(body);

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

      return handleSuccess<GetUserSchema>({
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
  });
