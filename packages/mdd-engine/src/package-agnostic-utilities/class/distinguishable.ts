export type Distinguisher = string;

/**
 * Allows classes with a similar structure to differentiate themselves.
 * TypeScript uses a structural type system instead of a nominal type system, so
 * it's possbible for two classes with different semantics to accidentally be used
 * interchangeably.
 */
export type Distinguishable<TDistinguisher extends Distinguisher> = {
  $distinguisher: TDistinguisher;
};
