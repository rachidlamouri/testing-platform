import { convertBigIntegerToNumber } from '../number/convertBigIntegerToNumber';
import { NANOSECONDS_PER_SECOND } from './constants';
import { Nanoseconds } from './nanoseconds';
import { Seconds } from './seconds';

/**
 * Preserves semantics of time objects, and abstracts the conversion
 */
export const convertNanosecondsToSeconds = (
  nanoseconds: Nanoseconds,
): Seconds => {
  return new Seconds(
    convertBigIntegerToNumber(nanoseconds.value / NANOSECONDS_PER_SECOND.value),
  );
};
