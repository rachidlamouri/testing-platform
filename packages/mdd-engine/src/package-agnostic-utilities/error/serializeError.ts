import { assertNotUndefined } from '../nil/assertNotUndefined';

/**
 * Standardizes serializing an error and handling the fact that error.stack can
 * be undefined
 */
export const serializeError = (error: Error): string => {
  assertNotUndefined(error.stack);

  // TODO: consider updating this to use the stack trace. The stack trace differs between local and the CI though
  return error.message;
};
