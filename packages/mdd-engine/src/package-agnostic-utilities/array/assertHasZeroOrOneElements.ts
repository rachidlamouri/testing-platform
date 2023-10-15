export function assertHasZeroOrOneElements<T>(
  list: T[],
): asserts list is [T] | [] {
  if (list.length > 1) {
    throw Error('Expected list to have zero elements or one element');
  }
}
