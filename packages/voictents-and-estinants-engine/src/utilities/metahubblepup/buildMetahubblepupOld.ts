import { Tuple } from './semantic-types/tuple';
import { SpreadN } from './spreadN';
import { TypeScriptFunction } from './typed-datum/type-script/function';

/**
 * Merges two objects without making the intellisense do something dumb, unlike
 * type-fest. Maybe one day we won't need this
 */
type Simplify<T1 extends object, T2 extends object> = {
  [Key in keyof (T1 & T2)]: (T1 & T2)[Key];
};

export type ObjectWithPrototype<
  TBaseObject extends object,
  TPrototype extends object,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = Simplify<TBaseObject, TPrototype>;

type RestrictedObjectInstance<
  TBaseObject extends object,
  TPrototype extends object,
  TObjectInstance extends object,
> = ObjectWithPrototype<TBaseObject, TPrototype> extends TObjectInstance
  ? TObjectInstance
  : never;

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

const CONSTRUCTOR_KEY_NAME = 'constructor';

type InputTransformer<
  TInputObject extends object,
  TBaseObject extends object,
> = (input: TInputObject) => TBaseObject;

type ConstructorFunctionBuilderInput<
  TConstructorName extends string,
  TBasePropertyNameTuple extends Tuple<string>,
  TInputObject extends object,
  TBaseObject extends object,
  TPrototype extends object,
  TObjectInstance extends object,
> = {
  constructorName: TConstructorName;
  transformInput: InputTransformer<TInputObject, TBaseObject>;
  basePropertyNameTuple: TBasePropertyNameTuple;
  prototypeConfiguration: PrototypeConfiguration<
    TBaseObject,
    TPrototype,
    TObjectInstance
  >;
};

type ConstructorFunctionBuilderOutput<
  TConstructorName extends string,
  TInputObject extends object,
  TBaseObject extends object,
  TPrototype extends object,
  TObjectInstance extends object,
> = SpreadN<
  [
    {
      tInput: TInputObject;
      tBase: TBaseObject;
      tPrototype: TPrototype;
      tInstance: TObjectInstance;
    },
    {
      [Key in TConstructorName]: ConstructorFunction<
        TBaseObject,
        TPrototype,
        TObjectInstance
      >;
    },
  ]
>;

export const thing1 = <
  TConstructorName extends string,
  TInputObject extends object,
  TBasePropertyNameTuple extends Tuple<string>,
  TBaseObject extends object,
  TPrototype extends object,
  TObjectInstance extends object,
>({
  basePropertyNameTuple,
  transformInput,
  constructorName,
  prototypeConfiguration,
}: ConstructorFunctionBuilderInput<
  TConstructorName,
  TBasePropertyNameTuple,
  TInputObject,
  TBaseObject,
  TPrototype,
  TObjectInstance
>): ConstructorFunctionBuilderOutput<
  TConstructorName,
  TInputObject,
  TBaseObject,
  TPrototype,
  TObjectInstance
> => {
  const prototype = {};
  Object.entries(prototypeConfiguration).forEach(([name, getter]) => {
    if (name === CONSTRUCTOR_KEY_NAME) {
      throw Error(`${CONSTRUCTOR_KEY_NAME} is a reserved key`);
    }

    Object.defineProperty(prototype, name, {
      get() {
        return (getter as TypeScriptFunction)(this);
      },
    });
  });

  const constructorFunction = function (
    this: ObjectWithPrototype<TBaseObject, TPrototype>,
    input: TInputObject,
  ): void {
    const rawBaseObject = transformInput(input);
    const restrictedBaseObject = Object.fromEntries(
      basePropertyNameTuple.map((basePropertyName) => {
        const value = rawBaseObject[basePropertyName as keyof TBaseObject];
        return [basePropertyName, value];
      }),
    );

    Object.assign(this, restrictedBaseObject);
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

  return {
    tInput: undefined,
    tBase: undefined,
    tInstance: undefined,
    tPrototype: undefined,
    [constructorName]: constructorFunction,
  } as unknown as ConstructorFunctionBuilderOutput<
    TConstructorName,
    TInputObject,
    TBaseObject,
    TPrototype,
    TObjectInstance
  >;
};

// const c = <

// >() => {};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const buildB = <
  TConstructorName extends string,
  TBasePropertyNameTuple extends Tuple<string>,
>(
  constructorName: TConstructorName,
  basePropertyNameTuple: TBasePropertyNameTuple,
) => {
  const b = <
    TBaseObject extends Record<TBasePropertyNameTuple[number], any>,
    TPrototype extends object,
    TObjectInstance extends object,
    TInputObject extends object = TBaseObject,
  >(
    transformInput: InputTransformer<TInputObject, TBaseObject>,
    prototypeConfiguration: PrototypeConfiguration<
      TBaseObject,
      TPrototype,
      TObjectInstance
    >,
  ): ConstructorFunctionBuilderOutput<
    TConstructorName,
    TInputObject,
    TBaseObject,
    TPrototype,
    TObjectInstance
  > => {
    return thing1({
      constructorName,
      basePropertyNameTuple,
      transformInput,
      prototypeConfiguration,
    });
  };

  return b;
};

type AInput<TConstructorName, TBasePropertyNameTuple extends Tuple<string>> = {
  constructorName: TConstructorName;
  basePropertyNameTuple: TBasePropertyNameTuple;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const a = <
  TConstructorName extends string,
  TBasePropertyNameTuple extends Tuple<string>,
>({
  constructorName,
  basePropertyNameTuple,
}: AInput<TConstructorName, TBasePropertyNameTuple>) => {
  const b = buildB(constructorName, basePropertyNameTuple);
  return b;
};

const x = a({
  constructorName: 'potato',
  basePropertyNameTuple: ['a', 'b', 'c'],
} as const);

type X = typeof x;

// export const buildMetaHubblepup = <
//   TInputPropertyNameTuple extends Tuple<string>,
// >(
//   inputPropertyNameTuple: TInputPropertyNameTuple,
// ) => {

// };
