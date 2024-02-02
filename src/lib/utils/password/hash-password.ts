import { HashPasswordParams } from './params';

export const hashPassword = async ({ password }: HashPasswordParams) => {
  return await Bun.password.hash(password);
};
