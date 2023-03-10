export type Predicate<TInput, TOutput> = TOutput extends TInput
  ? (input: TInput) => input is TOutput
  : (input: TInput) => false;

export type PredicateAssertionType<TPredicate> = TPredicate extends (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any,
) => input is infer TOutput
  ? TOutput
  : never;
