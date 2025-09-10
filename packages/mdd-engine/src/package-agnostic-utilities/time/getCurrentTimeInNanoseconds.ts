import { Nanoseconds } from './nanoseconds';

/**
 * Returns the current time in nanoseconds. Crazy stuff.
 */
export const getCurrentTimeInNanoseconds = (): Nanoseconds => {
  return new Nanoseconds(process.hrtime.bigint());
};
