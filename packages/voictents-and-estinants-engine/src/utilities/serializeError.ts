export const serializeError = (error: Error): string => {
  if (error.stack === undefined) {
    throw Error('"stack" is undefined');
  }

  return error.stack;
};
