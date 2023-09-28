import { TypeScriptObjectInstanceKey } from '../object/object';

export type Combination<TValue extends TypeScriptObjectInstanceKey> = Record<
  TValue,
  null
>;
