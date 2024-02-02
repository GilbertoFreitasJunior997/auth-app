import { z } from 'zod';

export const getUserSchema = z.object({
  id: z.number(),
  email: z.string(),
});

export type GetUserSchema = z.infer<typeof getUserSchema>;
