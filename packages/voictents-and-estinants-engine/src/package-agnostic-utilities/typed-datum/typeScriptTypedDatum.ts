import { TypeScriptFunction } from '../function/typeScriptFunction';
import { TypeScriptObject } from '../object/typeScriptObject';

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

type TypeScriptTypedBigint = BaseTypeScriptTypedDatum<
  TypeScriptDatumTypeName.bigint,
  bigint
>;

type TypeScriptTypedBoolean = BaseTypeScriptTypedDatum<
  TypeScriptDatumTypeName.boolean,
  boolean
>;

type TypeScriptTypedFunction = BaseTypeScriptTypedDatum<
  TypeScriptDatumTypeName.function,
  TypeScriptFunction
>;

type TypeScriptTypedNumber = BaseTypeScriptTypedDatum<
  TypeScriptDatumTypeName.number,
  number
>;

type TypeScriptTypedObject = BaseTypeScriptTypedDatum<
  TypeScriptDatumTypeName.object,
  TypeScriptObject
>;

type TypeScriptTypedString = BaseTypeScriptTypedDatum<
  TypeScriptDatumTypeName.string,
  string
>;

type TypeScriptTypedSymbol = BaseTypeScriptTypedDatum<
  TypeScriptDatumTypeName.symbol,
  symbol
>;

type TypeScriptTypedUndefined = BaseTypeScriptTypedDatum<
  TypeScriptDatumTypeName.undefined,
  undefined
>;

type TypeScriptTypedDatumOptionTuple = readonly [
  TypeScriptTypedBigint,
  TypeScriptTypedBoolean,
  TypeScriptTypedFunction,
  TypeScriptTypedNumber,
  TypeScriptTypedObject,
  TypeScriptTypedString,
  TypeScriptTypedSymbol,
  TypeScriptTypedUndefined,
];

/**
 * A custom data structure that is used by "getTypeScriptTypedDatum" to do the
 * same thing as `typeof`, but without hardcoded string literals for the all the
 * types. It uses an enum instead!
 */
type TypeScriptTypedDatum = TypeScriptTypedDatumOptionTuple[number];

/**
 * @todo move this to its own file since it deserves its own comment
 *
 * @todo then update the comment on "TypeScriptTypedDatum"
 */
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
