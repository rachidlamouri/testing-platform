export const isNotUndefined = <T>(datum: T): datum is Exclude<T, undefined> => {
  return datum !== undefined;
};
