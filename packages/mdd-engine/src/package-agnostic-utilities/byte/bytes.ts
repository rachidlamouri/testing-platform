import { ByteCount } from './byteCount';
import { byteFormatter } from './byteFormatter';

/**
 *  Tagged template function for defining a byte count using shorthand. Supports
 *  bytes, kilobytes, megabytes, and gigabytes
 *
 * @example
 *
 * // twelve bytes
 * bytes`12`
 *
 * // one hundred kilobytes
 * bytes`100KB`
 *
 * // nine megabytes
 * bytes`9MB`
 *
 * // 200 gigabytes
 * bytes`200GB`
 */
export const bytes = (
  literals: TemplateStringsArray,
  ...expressions: string[]
): ByteCount => {
  const inputList: string[] = [];
  literals.forEach((literal, index) => {
    inputList.push(literal);
    const nextExpression = expressions[index];
    if (nextExpression !== undefined) {
      inputList.push(nextExpression);
    }
  });

  const input = inputList.join('');
  const result = byteFormatter.parseInput(input);
  return result;
};
