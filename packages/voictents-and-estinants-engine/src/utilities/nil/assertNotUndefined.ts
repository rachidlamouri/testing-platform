export function assertNotUndefined<T>(
  datum: T,
  message = 'Expected datum to not be undefined',
): asserts datum is Exclude<T, undefined> {
  if (datum === undefined) {
    throw Error(message);
  }
}
