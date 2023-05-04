export const serializeError = (error: Error): string => {
  if (error.stack === undefined) {
    throw Error('"stack" is undefined');
  }

  // TODO: consider updating this to use the stack trace. The stack trace differs between local and the CI though
  return error.message;
};
