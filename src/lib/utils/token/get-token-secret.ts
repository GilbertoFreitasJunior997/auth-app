import { ApiError } from '@/lib/errors';

export const getTokenSecret = () => {
  const secret = process.env['JWT_SECRET'];
  if (!secret) {
    throw new ApiError();
  }

  return secret;
};
