import { z } from 'zod';

export const signinResponseSchema = z.object({
  token: z.string(),
});

export type SiginResponseSchema = z.infer<typeof signinResponseSchema>;
