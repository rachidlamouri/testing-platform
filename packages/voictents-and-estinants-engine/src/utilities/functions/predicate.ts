export type Predicate<TInput, TOutput> = TOutput extends TInput
  ? (input: TInput) => input is TOutput
  : (input: TInput) => false;
