import { Tuple } from '../type/tuple';

/**
 * The type of a function that is, IMO, easier to work with than "Function"
 */
export type TypeScriptFunction = (...argumentTuple: Tuple<unknown>) => unknown;
