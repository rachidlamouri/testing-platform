import { TypeScriptFunction } from './function';
import { TypeScriptObject } from './object';

export enum TypeScriptDatumTypeName {
  bigint = 'bigint',
  boolean = 'boolean',
  function = 'function',
  number = 'number',
  object = 'object',
  string = 'string',
  symbol = 'symbol',
  undefined = 'undefined',
}

type BaseTypeScriptTypedDatum<
  TTypeScriptDatumTypeName extends TypeScriptDatumTypeName,
  TDatum,
> = {
  typeName: TTypeScriptDatumTypeName;
  datum: TDatum;
};

export type TypeScriptTypedBigint = BaseTypeScriptTypedDatum<
  TypeScriptDatumTypeName.bigint,
  bigint
>;

export type TypeScriptTypedBoolean = BaseTypeScriptTypedDatum<
  TypeScriptDatumTypeName.boolean,
  boolean
>;

export type TypeScriptTypedFunction = BaseTypeScriptTypedDatum<
  TypeScriptDatumTypeName.function,
  TypeScriptFunction
>;

export type TypeScriptTypedNumber = BaseTypeScriptTypedDatum<
  TypeScriptDatumTypeName.number,
  number
>;

export type TypeScriptTypedObject = BaseTypeScriptTypedDatum<
  TypeScriptDatumTypeName.object,
  TypeScriptObject
>;

export type TypeScriptTypedString = BaseTypeScriptTypedDatum<
  TypeScriptDatumTypeName.string,
  string
>;

export type TypeScriptTypedSymbol = BaseTypeScriptTypedDatum<
  TypeScriptDatumTypeName.symbol,
  symbol
>;

export type TypeScriptTypedUndefined = BaseTypeScriptTypedDatum<
  TypeScriptDatumTypeName.undefined,
  undefined
>;

export type TypeScriptTypedDatumOptionTuple = readonly [
  TypeScriptTypedBigint,
  TypeScriptTypedBoolean,
  TypeScriptTypedFunction,
  TypeScriptTypedNumber,
  TypeScriptTypedObject,
  TypeScriptTypedString,
  TypeScriptTypedSymbol,
  TypeScriptTypedUndefined,
];

export type TypeScriptTypedDatum = TypeScriptTypedDatumOptionTuple[number];

export const getTypeScriptTypedDatum = (
  datum: unknown,
): TypeScriptTypedDatum => {
  const nativeTypeName = typeof datum;
  const enumeratedTypeName = nativeTypeName as TypeScriptDatumTypeName;

  return {
    typeName: enumeratedTypeName,
    datum,
  } as TypeScriptTypedDatum;
};
