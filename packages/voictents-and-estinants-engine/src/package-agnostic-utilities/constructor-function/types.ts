/**
 * @noCanonical
 */

import { UnsafeTuple } from '../type/tuple';
import { TypeScriptObjectInstance } from '../object/typeScriptObject';

export type ConstructorFunctionName = string;

export type ConstructorFunction<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TConstructorParameterTuple extends UnsafeTuple,
  TInstanceType extends TypeScriptObjectInstance,
> = { new (...args: TConstructorParameterTuple): TInstanceType };
