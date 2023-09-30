import { TypeScriptFunction } from '../function/typeScriptFunction';
import {
  TypeScriptArray,
  TypeScriptMap,
  TypeScriptObjectInstance,
  TypeScriptSet,
} from '../object/object';
import {
  getTypeScriptTypedDatum,
  TypeScriptDatumTypeName,
} from './typeScriptTypedDatum';

export enum CustomDatumTypeName {
  Array = 'Array',
  BigInteger = 'BigInteger',
  Boolean = 'Boolean',
  CustomObjectInstance = 'CustomObjectInstance',
  Function = 'Function',
  Map = 'Map',
  Null = 'Null',
  Number = 'Number',
  RootObjectInstance = 'RootObjectInstance',
  Set = 'Set',
  String = 'String',
  Symbol = 'Symbol',
  Undefined = 'Undefined',
}

type BaseCustomTypedDatum<
  TCustomDatumTypeName extends CustomDatumTypeName,
  TDatum,
> = {
  typeName: TCustomDatumTypeName;
  datum: TDatum;
};

export type CustomTypedArray = BaseCustomTypedDatum<
  CustomDatumTypeName.Array,
  TypeScriptArray
>;

export type CustomTypedBigInteger = BaseCustomTypedDatum<
  CustomDatumTypeName.BigInteger,
  bigint
>;

export type CustomTypedBoolean = BaseCustomTypedDatum<
  CustomDatumTypeName.Boolean,
  boolean
>;

export type CustomTypedCustomObjectInstance = BaseCustomTypedDatum<
  CustomDatumTypeName.CustomObjectInstance,
  TypeScriptObjectInstance
>;

export type CustomTypedFunction = BaseCustomTypedDatum<
  CustomDatumTypeName.Function,
  TypeScriptFunction
>;

export type CustomTypedMap = BaseCustomTypedDatum<
  CustomDatumTypeName.Map,
  TypeScriptMap
>;

export type CustomTypedNull = BaseCustomTypedDatum<
  CustomDatumTypeName.Null,
  null
>;

export type CustomTypedNumber = BaseCustomTypedDatum<
  CustomDatumTypeName.Number,
  number
>;

export type CustomTypedRootObjectInstance = BaseCustomTypedDatum<
  CustomDatumTypeName.RootObjectInstance,
  TypeScriptObjectInstance
>;

export type CustomTypedSet = BaseCustomTypedDatum<
  CustomDatumTypeName.Set,
  TypeScriptSet
>;

export type CustomTypedString = BaseCustomTypedDatum<
  CustomDatumTypeName.String,
  string
>;

export type CustomTypedSymbol = BaseCustomTypedDatum<
  CustomDatumTypeName.Symbol,
  symbol
>;

export type CustomTypedUndefined = BaseCustomTypedDatum<
  CustomDatumTypeName.Undefined,
  undefined
>;

export type CustomTypedDatum =
  | CustomTypedArray
  | CustomTypedBigInteger
  | CustomTypedBoolean
  | CustomTypedCustomObjectInstance
  | CustomTypedFunction
  | CustomTypedMap
  | CustomTypedNull
  | CustomTypedNumber
  | CustomTypedRootObjectInstance
  | CustomTypedSet
  | CustomTypedString
  | CustomTypedSymbol
  | CustomTypedUndefined;

export const getCustomTypedDatum = (inputDatum: unknown): CustomTypedDatum => {
  const typeScriptTypedDatum = getTypeScriptTypedDatum(inputDatum);

  switch (typeScriptTypedDatum.typeName) {
    case TypeScriptDatumTypeName.bigint:
      return {
        typeName: CustomDatumTypeName.BigInteger,
        datum: typeScriptTypedDatum.datum,
      };
    case TypeScriptDatumTypeName.boolean:
      return {
        typeName: CustomDatumTypeName.Boolean,
        datum: typeScriptTypedDatum.datum,
      };
    case TypeScriptDatumTypeName.function:
      return {
        typeName: CustomDatumTypeName.Function,
        datum: typeScriptTypedDatum.datum,
      };
    case TypeScriptDatumTypeName.number:
      return {
        typeName: CustomDatumTypeName.Number,
        datum: typeScriptTypedDatum.datum,
      };
    case TypeScriptDatumTypeName.object: {
      if (typeScriptTypedDatum.datum === null) {
        return {
          typeName: CustomDatumTypeName.Null,
          datum: typeScriptTypedDatum.datum,
        };
      }

      if (Array.isArray(typeScriptTypedDatum.datum)) {
        return {
          typeName: CustomDatumTypeName.Array,
          datum: typeScriptTypedDatum.datum,
        };
      }

      if (typeScriptTypedDatum.datum instanceof Set) {
        return {
          typeName: CustomDatumTypeName.Set,
          datum: typeScriptTypedDatum.datum,
        };
      }

      if (typeScriptTypedDatum.datum instanceof Map) {
        return {
          typeName: CustomDatumTypeName.Map,
          datum: typeScriptTypedDatum.datum,
        };
      }

      if (
        Object.getPrototypeOf(typeScriptTypedDatum.datum) === Object.prototype
      ) {
        return {
          typeName: CustomDatumTypeName.RootObjectInstance,
          datum: typeScriptTypedDatum.datum,
        };
      }

      return {
        typeName: CustomDatumTypeName.CustomObjectInstance,
        datum: typeScriptTypedDatum.datum,
      };
    }
    case TypeScriptDatumTypeName.string:
      return {
        typeName: CustomDatumTypeName.String,
        datum: typeScriptTypedDatum.datum,
      };
    case TypeScriptDatumTypeName.symbol:
      return {
        typeName: CustomDatumTypeName.Symbol,
        datum: typeScriptTypedDatum.datum,
      };
    case TypeScriptDatumTypeName.undefined:
      return {
        typeName: CustomDatumTypeName.Undefined,
        datum: typeScriptTypedDatum.datum,
      };
  }
};
