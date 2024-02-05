export const excludeKeys = <T extends object, Key extends keyof T>(
  entity: T,
  keys: Key[],
) => {
  return Object.fromEntries(
    Object.entries(entity).filter(([key]) => !(keys as string[]).includes(key)),
  ) as Omit<T, Key>;
};
