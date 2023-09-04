import { NonEmptyTuple } from '../semantic-types/tuple';
import { ConstructorFunction, ConstructorFunctionName } from './types';

type GenericPropertyName = string;
export type GenericPropertyNameTuple = NonEmptyTuple<GenericPropertyName>;

type ObjectLike<TPropertyName extends GenericPropertyName> = Record<
  TPropertyName,
  unknown
>;
export type GenericObjectLike = ObjectLike<GenericPropertyName>;

export type ConstructedInstance<
  TInstancePropertyNameTuple extends GenericPropertyNameTuple,
> = ObjectLike<TInstancePropertyNameTuple[number]>;

export type GenericConstructedInstance =
  ConstructedInstance<GenericPropertyNameTuple>;

export type GenericConstructorInput = GenericObjectLike;

type ConstructorFunctionFromBuilderContext<
  TConstructorInput extends GenericConstructorInput,
  TConstructedInstance extends GenericConstructedInstance,
> = ConstructorFunction<
  [constructorInput: TConstructorInput],
  TConstructedInstance
>;

export type ConstructorInputTransformer<
  TConstructorInput extends GenericConstructorInput,
  TConstructedInstance extends GenericConstructedInstance,
> = (input: TConstructorInput) => TConstructedInstance;

export type GenericConstructorInputTransformer = ConstructorInputTransformer<
  GenericConstructorInput,
  GenericConstructedInstance
>;

export type ConstructorFunctionBuilderContext = {
  constructorName: ConstructorFunctionName;
  transformInput: GenericConstructorInputTransformer;
  instancePropertyNameTuple: GenericPropertyNameTuple;
};

const CONSTRUCTOR_KEY_NAME = 'constructor';

export const buildConstructorFunction = <
  TConstructorInput extends GenericConstructorInput,
  TConstructedInstance extends GenericConstructedInstance,
>({
  constructorName,
  transformInput,
  instancePropertyNameTuple,
}: ConstructorFunctionBuilderContext): ConstructorFunctionFromBuilderContext<
  TConstructorInput,
  TConstructedInstance
> => {
  // TODO: add more input parameters to define a prototype if needed (probably not needed though)
  const prototype = {};

  const constructorFunction = function (
    this: GenericConstructedInstance,
    input: GenericConstructorInput,
  ): void {
    // "restrictedInstance" ignores extraneous properties, because structural typing allows "rawInstance" to have more properties than specified
    const rawInstance: GenericConstructedInstance = transformInput(input);
    const restrictedInstance: GenericConstructedInstance = Object.fromEntries(
      instancePropertyNameTuple.map((instancePropertyName) => {
        const value: unknown = rawInstance[instancePropertyName];
        return [instancePropertyName, value];
      }),
    );

    Object.assign(this, restrictedInstance);
  };

  Object.defineProperty(constructorFunction, 'name', {
    value: constructorName,
  });

  Object.assign(prototype, {
    [CONSTRUCTOR_KEY_NAME]: constructorFunction,
  });

  Object.assign(constructorFunction, { prototype });

  return constructorFunction as unknown as ConstructorFunctionFromBuilderContext<
    TConstructorInput,
    TConstructedInstance
  >;
};

export type NamedConstructorFunctionParent<
  TConstructorFunctionName extends ConstructorFunctionName,
  TConstructorInput extends GenericConstructorInput,
  TConstructedInstance extends GenericConstructedInstance,
> = {
  [TKey in TConstructorFunctionName]: ConstructorFunctionFromBuilderContext<
    TConstructorInput,
    TConstructedInstance
  >;
};
