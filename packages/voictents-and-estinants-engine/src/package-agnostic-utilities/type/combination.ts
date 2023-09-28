import { TypeScriptObjectInstanceKey } from '../typed-datum/type-script/object';

export type Combination<TValue extends TypeScriptObjectInstanceKey> = Record<
  TValue,
  null
>;
