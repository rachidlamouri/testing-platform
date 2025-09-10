import { NANOSECONDS_PER_MILLISECOND } from './constants';
import { Milliseconds } from './milliseconds';
import { Nanoseconds } from './nanoseconds';

/**
 * Preserves semantics of time objects, and abstracts the conversioon
 */
export const convertNanosecondsToMilliseconds = (
  nanoseconds: Nanoseconds,
): Milliseconds => {
  return new Milliseconds(
    nanoseconds.value / NANOSECONDS_PER_MILLISECOND.value,
  );
};
