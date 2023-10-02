/**
 * A function that returns a boolean that indicates something about the input
 */
export type Predicate<TInput, TOutput> = TOutput extends TInput
  ? (input: TInput) => input is TOutput
  : (input: TInput) => false;
