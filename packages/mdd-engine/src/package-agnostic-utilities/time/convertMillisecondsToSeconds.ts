import { convertBigIntegerToNumber } from '../number/convertBigIntegerToNumber';
import { MILLISECONDS_PER_SECOND } from './constants';
import { Milliseconds } from './milliseconds';
import { Seconds } from './seconds';

/**
 * Preserves semantics of time objects, and abstracts the conversioon
 */
export const convertMillisecondsToSeconds = (
  milliseconds: Milliseconds,
): Seconds => {
  return new Seconds(
    convertBigIntegerToNumber(
      milliseconds.value / MILLISECONDS_PER_SECOND.value,
    ),
  );
};
