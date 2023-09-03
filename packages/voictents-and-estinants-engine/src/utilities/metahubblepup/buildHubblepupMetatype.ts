import { Tuple, UnsafeTuple } from '../semantic-types/tuple';
import { SpreadN } from '../spreadN';
import { TypeScriptFunction } from '../typed-datum/type-script/function';
import {
  TypeScriptObject,
  TypeScriptObjectInstance,
} from '../typed-datum/type-script/object';

// /**
//  * Merges two objects without making the intellisense do something dumb, unlike
//  * type-fest. Maybe one day we won't need this
//  */
// type Simplify<T1 extends object, T2 extends object> = {
//   [Key in keyof (T1 & T2)]: (T1 & T2)[Key];
// };

// export type ObjectWithPrototype<
//   TBaseObject extends object,
//   TPrototype extends object,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// > = Simplify<TBaseObject, TPrototype>;

// type RestrictedObjectInstance<
//   TBaseObject extends object,
//   TPrototype extends object,
//   TObjectInstance extends object,
// > = ObjectWithPrototype<TBaseObject, TPrototype> extends TObjectInstance
//   ? TObjectInstance
//   : never;

// type Getter<
//   TBaseObject extends object,
//   TPrototype extends object,
//   TObjectInstance extends object,
//   TReturnValue,
// > = (
//   self: RestrictedObjectInstance<TBaseObject, TPrototype, TObjectInstance>,
// ) => TReturnValue;

// type PrototypeConfiguration<
//   TBaseObject extends object,
//   TPrototype extends object,
//   TObjectInstance extends object,
// > = {
//   [TKey in keyof TPrototype]: Getter<
//     TBaseObject,
//     TPrototype,
//     TObjectInstance,
//     TPrototype[TKey]
//   >;
// };

// type ConstructorFunction<
//   TBaseObject extends object,
//   TPrototype extends object,
//   TObjectInstance extends object,
// > = {
//   new (input: TBaseObject): RestrictedObjectInstance<
//     TBaseObject,
//     TPrototype,
//     TObjectInstance
//   >;
// };

// const CONSTRUCTOR_KEY_NAME = 'constructor';

// type InputTransformer<
//   TInputObject extends object,
//   TBaseObject extends object,
// > = (input: TInputObject) => TBaseObject;

// type ConstructorFunctionBuilderInput<
//   TConstructorName extends string,
//   TInstancePropertyNameTuple extends Tuple<string>,
//   TInputObject extends object,
//   TBaseObject extends object,
//   TPrototype extends object,
//   TObjectInstance extends object,
// > = {
//   constructorName: TConstructorName;
//   transformInput: InputTransformer<TInputObject, TBaseObject>;
//   instancePropertyNameTuple: TInstancePropertyNameTuple;
//   prototypeConfiguration: PrototypeConfiguration<
//     TBaseObject,
//     TPrototype,
//     TObjectInstance
//   >;
// };

// type ConstructorFunctionBuilderOutput<
//   TConstructorName extends string,
//   TInputObject extends object,
//   TBaseObject extends object,
//   TPrototype extends object,
//   TObjectInstance extends object,
// > = SpreadN<
//   [
//     {
//       tInput: TInputObject;
//       tBase: TBaseObject;
//       tPrototype: TPrototype;
//       tInstance: TObjectInstance;
//     },
//     {
//       [Key in TConstructorName]: ConstructorFunction<
//         TBaseObject,
//         TPrototype,
//         TObjectInstance
//       >;
//     },
//   ]
// >;

// export const thing1 = <
//   TConstructorName extends string,
//   TInputObject extends object,
//   TInstancePropertyNameTuple extends Tuple<string>,
//   TBaseObject extends object,
//   TPrototype extends object,
//   TObjectInstance extends object,
// >({
//   instancePropertyNameTuple,
//   transformInput,
//   constructorName,
//   prototypeConfiguration,
// }: ConstructorFunctionBuilderInput<
//   TConstructorName,
//   TInstancePropertyNameTuple,
//   TInputObject,
//   TBaseObject,
//   TPrototype,
//   TObjectInstance
// >): ConstructorFunctionBuilderOutput<
//   TConstructorName,
//   TInputObject,
//   TBaseObject,
//   TPrototype,
//   TObjectInstance
// > => {
//   const prototype = {};
//   Object.entries(prototypeConfiguration).forEach(([name, getter]) => {
//     if (name === CONSTRUCTOR_KEY_NAME) {
//       throw Error(`${CONSTRUCTOR_KEY_NAME} is a reserved key`);
//     }

//     Object.defineProperty(prototype, name, {
//       get() {
//         return (getter as TypeScriptFunction)(this);
//       },
//     });
//   });

//   const constructorFunction = function (
//     this: ObjectWithPrototype<TBaseObject, TPrototype>,
//     input: TInputObject,
//   ): void {
//     const rawBaseObject = transformInput(input);
//     const restrictedBaseObject = Object.fromEntries(
//       instancePropertyNameTuple.map((basePropertyName) => {
//         const value = rawBaseObject[basePropertyName as keyof TBaseObject];
//         return [basePropertyName, value];
//       }),
//     );

//     Object.assign(this, restrictedBaseObject);
//   };

//   Object.defineProperty(constructorFunction, 'name', {
//     value: constructorName,
//   });

//   Object.assign(prototype, {
//     [CONSTRUCTOR_KEY_NAME]: constructorFunction,
//   });

//   Object.assign(
//     // eslint-disable-next-line func-names
//     constructorFunction,
//     { prototype },
//   );

//   return {
//     tInput: undefined,
//     tBase: undefined,
//     tInstance: undefined,
//     tPrototype: undefined,
//     [constructorName]: constructorFunction,
//   } as unknown as ConstructorFunctionBuilderOutput<
//     TConstructorName,
//     TInputObject,
//     TBaseObject,
//     TPrototype,
//     TObjectInstance
//   >;
// };

// const buildInputTypeBuilder =

// // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// const buildInstanceTypeBuilder = <
//   TConstructorName extends string,
//   TInstancePropertyNameTuple extends Tuple<string>,
// >(
//   constructorName: TConstructorName,
//   instancePropertyNameTuple: TInstancePropertyNameTuple,
// ) => {
//   const buildInstanceType = <
//     TBaseObject extends Record<TInstancePropertyNameTuple[number], any>,
//     TPrototype extends object,
//     TObjectInstance extends object,
//     TInputObject extends object = TBaseObject,
//   >(
//     transformInput: InputTransformer<TInputObject, TBaseObject>,
//     prototypeConfiguration: PrototypeConfiguration<
//       TBaseObject,
//       TPrototype,
//       TObjectInstance
//     >,
//   ): ConstructorFunctionBuilderOutput<
//     TConstructorName,
//     TInputObject,
//     TBaseObject,
//     TPrototype,
//     TObjectInstance
//   > => {
//     return thing1({
//       constructorName,
//       instancePropertyNameTuple,
//       transformInput,
//       prototypeConfiguration,
//     });
//   };

//   return buildInstanceType;
// };

// type ConstructorFunction<
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   TConstructorParameterTuple extends UnsafeTuple,
//   TInstanceType extends TypeScriptObjectInstance,
// > = { new (...args: TConstructorParameterTuple): TInstanceType };

// type GenericConstructorFunction = ConstructorFunction<
//   UnsafeTuple,
//   TypeScriptObjectInstance
// >;

// type ConstructorFunctionName = string;
// type HubblepupConstructorInput = TypeScriptObjectInstance;
// type HubblepupInstance = TypeScriptObjectInstance;

// type ConstructorFunctionFromBuilderContext<
//   THubblepupConstructorInput extends HubblepupConstructorInput,
//   THubblepupInstance extends HubblepupInstance,
// > = ConstructorFunction<
//   [constructorInput: THubblepupConstructorInput],
//   THubblepupInstance
// >;

// const buildConstructorFunction = <
//   THubblepupConstructorInput extends HubblepupConstructorInput,
//   THubblepupInstance extends HubblepupInstance,
// >({
//   constructorName,
//   transformInput,
//   instancePropertyNameTuple,
// }: ConstructorFunctionBuilderInput): ConstructorFunctionFromBuilderContext<
//   THubblepupConstructorInput,
//   THubblepupInstance
// > => {
//   // TODO: add more input parameters to define a prototype if needed (probably not needed though)
//   const prototype = {};

//   const constructorFunction = function (
//     this: HubblepupInstance,
//     input: HubblepupConstructorInput,
//   ): void {
//     // "restrictedInstance" ignores extraneous properties, because structural typing allows "rawInstance" to have more properties than specified
//     const rawInstance: HubblepupInstance = transformInput(input);
//     const restrictedInstance: HubblepupInstance = Object.fromEntries(
//       instancePropertyNameTuple.map((instancePropertyName) => {
//         const value: unknown = rawInstance[instancePropertyName];
//         return [instancePropertyName, value];
//       }),
//     );

//     Object.assign(this, restrictedInstance);
//   };

//   Object.defineProperty(constructorFunction, 'name', {
//     value: constructorName,
//   });

//   Object.assign(prototype, {
//     [CONSTRUCTOR_KEY_NAME]: constructorFunction,
//   });

//   Object.assign(
//     // eslint-disable-next-line func-names
//     constructorFunction,
//     { prototype },
//   );

//   return constructorFunction as unknown as ConstructorFunctionFromBuilderContext<
//     THubblepupConstructorInput,
//     THubblepupInstance
//   >;
// };

// };

// type G = ConstructorFunctionFromBuilderContext<{ a: number }, { b: string }>;

// const Foobar = function () {} as G;

// const y = new Foobar({ a: 2 });

// {
//   new (input: TBaseObject): RestrictedObjectInstance<
//     TBaseObject,
//     TPrototype,
//     TObjectInstance
//   >;
// };

type AInput<
  TConstructorName,
  TInstancePropertyNameTuple extends Tuple<string>,
> = {
  constructorFunctionName: TConstructorName;
  instancePropertyNameTuple: TInstancePropertyNameTuple;
};

type HubblepupConstructorBuilder = () => void;

// const buildHubblepupConstructorBuilder = (contextA: object) => {
//   const buildHubblepupConstructor = () => {

//   }
// }

type HubblepupInputTypeBuilder = () => void;

type HubblepupInstanceTypeBuilder = () => void;

type HubblepupInstanceTypeBuilderParent = {
  withInstanceType: HubblepupInstanceTypeBuilder;
};

type HubblepupMetatypeBuilder = () => void;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const buildHubblepupMetatype = <
  TConstructorName extends string,
  TInstancePropertyNameTuple extends Tuple<string>,
>({
  constructorFunctionName: constructorName,
  instancePropertyNameTuple,
}: AInput<TConstructorName, TInstancePropertyNameTuple>) => {
  return {
    withInstanceType: buildInstanceTypeBuilder(
      constructorName,
      instancePropertyNameTuple,
    ),
  };
};

const x = a({
  constructorName: 'potato',
  instancePropertyNameTuple: ['a', 'b', 'c'],
} as const);

type X = typeof x;

// export const buildMetaHubblepup = <
//   TInputPropertyNameTuple extends Tuple<string>,
// >(
//   inputPropertyNameTuple: TInputPropertyNameTuple,
// ) => {

// };

const q1 = buildHubblepupMetatype({
  constructorFunctionName: 'MyInstance',
  instancePropertyNameTuple: ['abc', 'xyz'],
})
  .withInstanceType<{
    abc: string;
    xyz: number;
  }>()
  .assemble();

const q2 = buildHubblepupMetatype({
  constructorFunctionName: 'MyInstance',
  instancePropertyNameTuple: ['abc', 'xyz'],
})
  .withInstanceType<{
    abc: string;
    xyz: number;
  }>()
  .withInputType<{
    value: number;
  }>({
    transform: ({ value }) => {
      return {
        abc: value.toString(),
        xyz: value,
      };
    },
  })
  .assemble();
