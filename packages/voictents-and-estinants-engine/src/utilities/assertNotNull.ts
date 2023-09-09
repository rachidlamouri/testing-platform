export function assertNotNull<T>(
  datum: T,
  messsage = 'Expected datum to not be null',
): asserts datum is Exclude<T, null> {
  if (datum === null) {
    throw Error(messsage);
  }
}
