import { z } from 'zod';

export const loginResponseSchema = z.object({
  token: z.string(),
});

export type LoginResponseSchema = z.infer<typeof loginResponseSchema>;
