export const isNullish = (datum: unknown): datum is null | undefined => {
  return datum === null || datum === undefined;
};
