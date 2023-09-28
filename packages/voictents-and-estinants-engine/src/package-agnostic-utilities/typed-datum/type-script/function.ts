import { Tuple } from '../../type/tuple';

export type TypeScriptFunction = (...argumentTuple: Tuple<unknown>) => unknown;
