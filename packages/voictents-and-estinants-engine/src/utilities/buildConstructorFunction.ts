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

type RestrictedObjectInstance<
  TBaseObject extends object,
  TPrototype extends object,
  TObjectInstance extends object,
> = ObjectWithPrototype<TBaseObject, TPrototype> extends TObjectInstance
  ? TObjectInstance
  : never;

type ConstructorFunction<
  TBaseObject extends object,
  TPrototype extends object,
  TObjectInstance extends object,
> = {
  new (input: TBaseObject): RestrictedObjectInstance<
    TBaseObject,
    TPrototype,
    TObjectInstance
  >;
};

type Getter<
  TBaseObject extends object,
  TPrototype extends object,
  TObjectInstance extends object,
  TReturnValue,
> = (
  self: RestrictedObjectInstance<TBaseObject, TPrototype, TObjectInstance>,
) => TReturnValue;

type PrototypeConfiguration<
  TBaseObject extends object,
  TPrototype extends object,
  TObjectInstance extends object,
> = {
  [TKey in keyof TPrototype]: Getter<
    TBaseObject,
    TPrototype,
    TObjectInstance,
    TPrototype[TKey]
  >;
};

type ConstructorFunctionBuilderInput<
  TConstructorName extends string,
  TBaseObject extends object,
  TPrototype extends object,
  TObjectInstance extends object,
> = {
  constructorName: TConstructorName;
  prototypeConfiguration: PrototypeConfiguration<
    TBaseObject,
    TPrototype,
    TObjectInstance
  >;
};

type ConstructorFunctionParent<
  TConstructorName extends string,
  TBaseObject extends object,
  TPrototype extends object,
  TObjectInstance extends object,
> = {
  [Key in TConstructorName]: ConstructorFunction<
    TBaseObject,
    TPrototype,
    TObjectInstance
  >;
};

const CONSTRUCTOR_KEY_NAME = 'constructor';

const buildConstructorFunction = <
  TConstructorName extends string,
  TBaseObject extends object,
  TPrototype extends object,
  TObjectInstance extends object,
>({
  constructorName,
  prototypeConfiguration,
}: ConstructorFunctionBuilderInput<
  TConstructorName,
  TBaseObject,
  TPrototype,
  TObjectInstance
>): ConstructorFunctionParent<
  TConstructorName,
  TBaseObject,
  TPrototype,
  TObjectInstance
> => {
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
      TPrototype,
      TObjectInstance
    >,
  } as ConstructorFunctionParent<
    TConstructorName,
    TBaseObject,
    TPrototype,
    TObjectInstance
  >;

  return constructorFunctionParent;
};

export const buildConstructorFunctionWithName = <
  TConstructorName extends string,
>(
  constructorName: TConstructorName,
) => {
  return <
    TBaseObject extends object,
    TPrototype extends object,
    TObjectInstance extends object = ObjectWithPrototype<
      TBaseObject,
      TPrototype
    >,
  >(
    prototypeConfiguration: PrototypeConfiguration<
      TBaseObject,
      TPrototype,
      TObjectInstance
    >,
  ): ConstructorFunctionParent<
    TConstructorName,
    TBaseObject,
    TPrototype,
    TObjectInstance
  > =>
    buildConstructorFunction<
      TConstructorName,
      TBaseObject,
      TPrototype,
      TObjectInstance
    >({
      constructorName,
      prototypeConfiguration,
    });
};
