import { Tuple } from '../../semantic-types/tuple';

export type TypeScriptFunction = (...argumentTuple: Tuple<unknown>) => unknown;
