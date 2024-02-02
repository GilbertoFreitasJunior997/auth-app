import type { CreateTokenParams } from './params';
import { getTokenSecret } from './get-token-secret';
import { sign } from 'hono/jwt';

export const createToken = async ({ payload }: CreateTokenParams) => {
  const secret = getTokenSecret();
  const token = await sign(payload, secret);

  return token;
};
