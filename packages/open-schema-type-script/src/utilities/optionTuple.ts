/**
 * A collection where only one element is expected to be used, and not the collection as a whole
 */
export type OptionTuple<TTuple extends readonly unknown[]> = TTuple;
