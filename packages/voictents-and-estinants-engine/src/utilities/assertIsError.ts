export function assertIsError(datum: unknown): asserts datum is Error {
  if (!(datum instanceof Error)) {
    throw Error('Expected datum to be an error');
  }
}
