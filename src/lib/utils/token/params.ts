import type { TokenUser } from '@/lib/general-models';

export type CreateTokenParams = {
  payload: TokenUser;
};

export type DecodeTokenParams = {
  token: string;
};
