import { UnsafeInteger, isInteger } from './isInteger';

/**
 * Asserts a value is an integer
 */
export function assertIsInteger(
  value: unknown,
): asserts value is UnsafeInteger {
  if (!isInteger(value)) {
    throw new Error(`Expected an integer.`);
  }
}
