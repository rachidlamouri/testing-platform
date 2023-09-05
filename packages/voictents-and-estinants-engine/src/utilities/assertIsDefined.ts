export function assertIsDefined<T>(
  datum: T,
): asserts datum is Exclude<T, undefined> {
  if (datum === undefined) {
    throw Error('Expected datum to not be undefined');
  }
}
