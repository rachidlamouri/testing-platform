export const isNotNull = <T>(datum: T): datum is Exclude<T, null> => {
  return datum !== null;
};
