import { TypeScriptObjectInstanceKey } from '../object/typeScriptObject';

/**
 * A set where the order doesn't matter. This is used when we need to provide
 * each string in a union exactly once. You cannot transform a union type to a
 * tuple type (see https://stackoverflow.com/a/55128956), so the next best thing
 * is to define an object type where each string is must be a key (objects can't
 * have duplicate keys), and the value doesn't matter.
 */
export type Combination<TValue extends TypeScriptObjectInstanceKey> = Record<
  TValue,
  null
>;
