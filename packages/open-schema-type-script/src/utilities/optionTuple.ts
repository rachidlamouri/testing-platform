/**
 * A collection where only one element is expected to be used, and not the collection as a whole
 */
export type OptionTuple<
  TTuple extends readonly unknown[] = readonly unknown[],
> = TTuple;

/**
 * A collection of collections where only one element in each collection is expected to be used, and not each collection as a whole
 */
export type OptionTupleTuple<TTupleTuple extends readonly OptionTuple[]> =
  TTupleTuple;
