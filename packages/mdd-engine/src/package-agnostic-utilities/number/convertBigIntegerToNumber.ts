/**
 * Encapsulates any additional logic for verying that it's safe to cast a bigint
 * to a number. Currently that logic does not exist.
 */
export const convertBigIntegerToNumber = (value: bigint): number => {
  return Number(value);
};
