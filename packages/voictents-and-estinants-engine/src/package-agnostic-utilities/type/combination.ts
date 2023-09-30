import { TypeScriptObjectInstanceKey } from '../object/typeScriptObject';

export type Combination<TValue extends TypeScriptObjectInstanceKey> = Record<
  TValue,
  null
>;
