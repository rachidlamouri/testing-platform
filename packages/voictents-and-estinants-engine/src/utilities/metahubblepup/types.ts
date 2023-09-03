import { UnsafeTuple } from '../semantic-types/tuple';
import { TypeScriptObjectInstance } from '../typed-datum/type-script/object';

export type ConstructorFunctionName = string;

export type ConstructorFunction<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TConstructorParameterTuple extends UnsafeTuple,
  TInstanceType extends TypeScriptObjectInstance,
> = { new (...args: TConstructorParameterTuple): TInstanceType };

export type GenericConstructorFunction = ConstructorFunction<
  UnsafeTuple,
  TypeScriptObjectInstance
>;
