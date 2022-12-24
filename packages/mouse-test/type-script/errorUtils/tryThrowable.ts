export type NonErrorResult<T> = {
  didThrow: false;
  value: T;
}

export type ErrorResult = {
  didThrow: true;
  value: unknown;
}

export type ThrowableResult<T> = NonErrorResult<T> | ErrorResult;

export const tryThrowable = <T>(closure: () => T): ThrowableResult<T> => {
  let closureResult: T;

  try {
    closureResult = closure();
  } catch (error: unknown) {
    return {
      didThrow: true,
      value: error,
    } satisfies ErrorResult;
  }

  return {
    didThrow: false,
    value: closureResult,
  } satisfies NonErrorResult<T>;
};
