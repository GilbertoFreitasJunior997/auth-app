import { ArePasswordEqualsParams } from './params';

export const arePasswordEquals = async ({ password, hashedPassword }: ArePasswordEqualsParams) => {
  return await Bun.password.verify(password, hashedPassword);
};
