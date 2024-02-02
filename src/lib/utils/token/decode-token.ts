import type { DecodeTokenParams } from './params';
import { getTokenSecret } from './get-token-secret';
import { verify } from 'hono/jwt';

export const decodeToken = async ({ token }: DecodeTokenParams) => {
  const secret = getTokenSecret();

  return await verify(token, secret);
};
