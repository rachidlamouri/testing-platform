import { Tuple } from '../semantic-types/tuple';
import { ConstructorFunction, ConstructorFunctionName } from './types';

type GenericHubblepupPropertyName = string;
export type GenericHubblepupPropertyNameTuple =
  Tuple<GenericHubblepupPropertyName>;

type HubblepupLike<TPropertyName extends GenericHubblepupPropertyName> = Record<
  TPropertyName,
  unknown
>;
type GenericHubblepupLike = HubblepupLike<GenericHubblepupPropertyName>;

export type HubblepupInstance<
  THubblepupInstancePropertyNameTuple extends GenericHubblepupPropertyNameTuple,
> = HubblepupLike<THubblepupInstancePropertyNameTuple[number]>;

export type GenericHubblepupInstance =
  HubblepupInstance<GenericHubblepupPropertyNameTuple>;

export type HubblepupConstructorInput = GenericHubblepupLike;

export type ConstructorFunctionFromBuilderContext<
  THubblepupConstructorInput extends HubblepupConstructorInput,
  THubblepupInstance extends GenericHubblepupInstance,
> = ConstructorFunction<
  [constructorInput: THubblepupConstructorInput],
  THubblepupInstance
>;

export type HubblepupConstructorInputTransformer<
  THubblepupConstructorInput extends HubblepupConstructorInput,
  THubblepupInstance extends GenericHubblepupInstance,
> = (input: THubblepupConstructorInput) => THubblepupInstance;

export type GenericHubblepupConstructorInputTransformer =
  HubblepupConstructorInputTransformer<
    HubblepupConstructorInput,
    GenericHubblepupInstance
  >;

export type HubblepupConstructorFunctionBuilderContext = {
  constructorName: ConstructorFunctionName;
  transformInput: GenericHubblepupConstructorInputTransformer;
  instancePropertyNameTuple: GenericHubblepupPropertyNameTuple;
};

const CONSTRUCTOR_KEY_NAME = 'constructor';

export const buildConstructorFunction = <
  THubblepupConstructorInput extends HubblepupConstructorInput,
  THubblepupInstance extends GenericHubblepupInstance,
>({
  constructorName,
  transformInput,
  instancePropertyNameTuple,
}: HubblepupConstructorFunctionBuilderContext): ConstructorFunctionFromBuilderContext<
  THubblepupConstructorInput,
  THubblepupInstance
> => {
  // TODO: add more input parameters to define a prototype if needed (probably not needed though)
  const prototype = {};

  const constructorFunction = function (
    this: GenericHubblepupInstance,
    input: HubblepupConstructorInput,
  ): void {
    // "restrictedInstance" ignores extraneous properties, because structural typing allows "rawInstance" to have more properties than specified
    const rawInstance: GenericHubblepupInstance = transformInput(input);
    const restrictedInstance: GenericHubblepupInstance = Object.fromEntries(
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

  Object.assign(
    // eslint-disable-next-line func-names
    constructorFunction,
    { prototype },
  );

  return constructorFunction as unknown as ConstructorFunctionFromBuilderContext<
    THubblepupConstructorInput,
    THubblepupInstance
  >;
};
