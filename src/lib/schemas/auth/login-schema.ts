import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginShcema = z.infer<typeof loginSchema>;
