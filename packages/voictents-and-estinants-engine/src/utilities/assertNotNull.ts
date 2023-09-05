export function assertNotNull<T>(datum: T): asserts datum is Exclude<T, null> {
  if (datum === null) {
    throw Error('Expected datum to not be null');
  }
}
