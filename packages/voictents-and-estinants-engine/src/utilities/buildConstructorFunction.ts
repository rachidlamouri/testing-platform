import { TypeScriptFunction } from './typed-datum/type-script/function';

/**
 * Merges two objects without making the intellisense do something dumb, unlike
 * type-fest. Maybe one day we won't need this
 */
type SimpleSimplify<TObject1 extends object, TObject2 extends object> = {
  [TKey in keyof TObject1 | keyof TObject2]: TKey extends keyof TObject1 &
    keyof TObject2
    ? TObject1[TKey] & TObject2[TKey]
    : TKey extends keyof TObject1
    ? TObject1[TKey]
    : TKey extends keyof TObject2
    ? TObject2[TKey]
    : never;
};

export type ObjectWithPrototype<
  TBaseObject extends object,
  TPrototype extends object,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = SimpleSimplify<TBaseObject, TPrototype>;

type ConstructorFunction<
  TBaseObject extends object,
  TPrototype extends object,
> = {
  new (input: TBaseObject): ObjectWithPrototype<TBaseObject, TPrototype>;
};

type Getter<
  TBaseObject extends object,
  TPrototype extends object,
  TReturnValue,
> = (self: ObjectWithPrototype<TBaseObject, TPrototype>) => TReturnValue;

type PrototypeConfiguration<
  TBaseObject extends object,
  TPrototype extends object,
> = {
  [TKey in keyof TPrototype]: Getter<TBaseObject, TPrototype, TPrototype[TKey]>;
};

type ConstructorFunctionBuilderInput<
  TConstructorName extends string,
  TBaseObject extends object,
  TPrototype extends object,
> = {
  constructorName: TConstructorName;
  prototypeConfiguration: PrototypeConfiguration<TBaseObject, TPrototype>;
};

type ConstructorFunctionParent<
  TConstructorName extends string,
  TBaseObject extends object,
  TPrototype extends object,
> = {
  [Key in TConstructorName]: ConstructorFunction<TBaseObject, TPrototype>;
};

const CONSTRUCTOR_KEY_NAME = 'constructor';

const buildConstructorFunction = <
  TConstructorName extends string,
  TBaseObject extends object,
  TPrototype extends object,
>({
  constructorName,
  prototypeConfiguration,
}: ConstructorFunctionBuilderInput<
  TConstructorName,
  TBaseObject,
  TPrototype
>): ConstructorFunctionParent<TConstructorName, TBaseObject, TPrototype> => {
  const prototype = {};
  Object.entries(prototypeConfiguration).forEach(([name, getter]) => {
    if (getter === CONSTRUCTOR_KEY_NAME) {
      throw Error('"constructor" is a reserved key');
    }

    Object.defineProperty(prototype, name, {
      get() {
        return (getter as TypeScriptFunction)(this);
      },
    });
  });

  const constructorFunction = function (
    this: ObjectWithPrototype<TBaseObject, TPrototype>,
    input: TBaseObject,
  ): void {
    Object.assign(this, input);
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

  const constructorFunctionParent = {
    [constructorName]: constructorFunction as unknown as ConstructorFunction<
      TBaseObject,
      TPrototype
    >,
  } as ConstructorFunctionParent<TConstructorName, TBaseObject, TPrototype>;

  return constructorFunctionParent;
};

export const buildConstructorFunctionWithName = <
  TConstructorName extends string,
>(
  constructorName: TConstructorName,
) => {
  return <TBaseObject extends object, TPrototype extends object>(
    prototypeConfiguration: PrototypeConfiguration<TBaseObject, TPrototype>,
  ): ConstructorFunctionParent<TConstructorName, TBaseObject, TPrototype> =>
    buildConstructorFunction<TConstructorName, TBaseObject, TPrototype>({
      constructorName,
      prototypeConfiguration,
    });
};
