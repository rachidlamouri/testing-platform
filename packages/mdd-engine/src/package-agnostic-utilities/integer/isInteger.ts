// note: The Integer class enforces that a value is actually an integer via this utility
export type UnsafeInteger = number | bigint;

/**
 * Predicate for checking if a value is a bigint or an integer number
 */
export const isInteger = (value: unknown): value is UnsafeInteger => {
  if (typeof value === 'bigint') {
    return true;
  }

  if (typeof value !== 'number') {
    return false;
  }

  const stringRepresentation = `${value}`;
  const result = !stringRepresentation.includes('.');
  return result;
};
