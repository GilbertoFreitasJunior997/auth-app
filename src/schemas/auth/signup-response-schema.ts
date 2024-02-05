import { z } from 'zod';

export const signupResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
});

export type SignupResponseSchema = z.infer<typeof signupResponseSchema>;
