import {
  Json,
  JsonBoolean,
  JsonNull,
  JsonNumber,
  JsonObject,
  JsonString,
} from './json';
import { Merge } from './merge';

export enum CustomNotationTypeName {
  SINGLE_LINE_STRING = 'single-line-string',
  MULTILINE_STRING = 'multiline-string',
  SYMBOL = 'symbol',
  NUMBER = 'number',
  BIG_INT = 'bigint',
  BOOLEAN = 'boolean',
  UNDEFINED = 'undefined',
  NULL = 'null',
  LIST = 'list',
  OBJECT = 'object',
  CIRCULAR_REFERENCE = 'circular-reference',
}

type CustomNotationWithMetadata<
  TTypeName extends CustomNotationTypeName,
  TMetadata extends JsonObject,
> = Merge<{ typeName: TTypeName }, TMetadata>;

type CustomNotationWithValue<
  TTypeName extends CustomNotationTypeName,
  TValue extends Json,
> = {
  typeName: TTypeName;
  value: TValue;
};

type Referenceable<TMetadata extends JsonObject = JsonObject> = Merge<
  { uuid: JsonString },
  TMetadata
>;

export type CustomNotationSingleLineString =
  | CustomNotationWithValue<
      CustomNotationTypeName.SINGLE_LINE_STRING,
      JsonString
    >
  | JsonString;

export type CustomNotationMultilineString = CustomNotationWithMetadata<
  CustomNotationTypeName.MULTILINE_STRING,
  { lines: JsonString[] }
>;

export type CustomNotationSymbol = CustomNotationWithMetadata<
  CustomNotationTypeName.SYMBOL,
  Referenceable<{ description: JsonString }>
>;

export type CustomNotationNumber =
  | CustomNotationWithValue<CustomNotationTypeName.NUMBER, JsonNumber>
  | JsonNumber;

export type CustomNotationBigInt = CustomNotationWithValue<
  CustomNotationTypeName.BIG_INT,
  JsonString
>;

export type CustomNotationBoolean =
  | CustomNotationWithValue<CustomNotationTypeName.BOOLEAN, JsonBoolean>
  | JsonBoolean;

export type CustomNotationUndefined = {
  typeName: CustomNotationTypeName.UNDEFINED;
};

export type CustomNotationNull =
  | CustomNotationWithValue<CustomNotationTypeName.NULL, JsonNull>
  | JsonNull;

type CustomNotationArray = CustomNotationWithMetadata<
  CustomNotationTypeName.LIST,
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  Referenceable<{ values: CustomNotation[] }>
>;

type CustomNotationTuple = CustomNotationWithMetadata<
  CustomNotationTypeName.LIST,
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  Referenceable<{ values: readonly CustomNotation[] }>
>;

export type CustomNotationList = CustomNotationArray | CustomNotationTuple;

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type CustomNotationObjectEntry = [CustomNotation, CustomNotation];

export type CustomNotationObjectEntryTuple = CustomNotationObjectEntry[];

export type CustomNotationObjectEntryRecord = Record<
  JsonString,
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  CustomNotation
>;

export type CustomNotationObjectEntries =
  | CustomNotationObjectEntryTuple
  | CustomNotationObjectEntryRecord;

export type CustomNotationObject = CustomNotationWithMetadata<
  CustomNotationTypeName.OBJECT,
  Referenceable<{
    prototypeNameTuple?: JsonString[];
    entries: CustomNotationObjectEntries;
  }>
>;

export type CustomNotationCircularReference = CustomNotationWithMetadata<
  CustomNotationTypeName.CIRCULAR_REFERENCE,
  Referenceable
>;

export type CustomNotation =
  | CustomNotationSingleLineString
  | CustomNotationMultilineString
  | CustomNotationSymbol
  | CustomNotationNumber
  | CustomNotationBigInt
  | CustomNotationBoolean
  | CustomNotationUndefined
  | CustomNotationNull
  | CustomNotationList
  | CustomNotationObject
  | CustomNotationCircularReference;

export type ReferenceableCustomNotation =
  | CustomNotationSymbol
  | CustomNotationList
  | CustomNotationObject;

export type CustomNotationRoot = {
  datum: CustomNotation;
  referenceMap: Record<string, ReferenceableCustomNotation>;
};
