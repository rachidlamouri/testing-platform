import { Tuple } from '../../semantic-types/tuple';
import { CustomDatumTypeName, getCustomTypedDatum } from '../customTypedDatum';
import { TypeScriptObjectInstance } from '../type-script/object';

export enum SerializeableNodeName {
  Boolean = 'Boolean',
  List = 'List',
  Null = 'Null',
  Number = 'Number',
  Object = 'Object',
  String = 'String',
}

type BaseSerializeableNode<
  TNodeName extends SerializeableNodeName,
  TMetadata extends TypeScriptObjectInstance,
> = {
  nodeName: TNodeName;
  metadata: TMetadata;
};

// Boolean
export type SerializeableBooleanNode = BaseSerializeableNode<
  SerializeableNodeName.Boolean,
  { value: boolean }
>;

// List
export type SerializeableListNode = BaseSerializeableNode<
  SerializeableNodeName.List,
  {
    typeName: CustomDatumTypeName.Array | CustomDatumTypeName.Set;
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    valueTuple: Tuple<SerializeableNode>;
  }
>;

// Null
export type SerializeableNullDatum = {
  typeName: CustomDatumTypeName.Null;
  value: null;
};

export type SerializeableUndefinedDatum = {
  typeName: CustomDatumTypeName.Undefined;
  value: undefined;
};

export type SerializeableNullNodeDatum =
  | SerializeableNullDatum
  | SerializeableUndefinedDatum;

export type SerializeableNullNode = BaseSerializeableNode<
  SerializeableNodeName.Null,
  SerializeableNullNodeDatum
>;

// Number
export type SerializeablBigIntegerDatum = {
  typeName: CustomDatumTypeName.BigInteger;
  value: bigint;
};

export type SerializeableNumberDatum = {
  typeName: CustomDatumTypeName.Number;
  value: number;
};

export type SerializeableNumberNodeDatum =
  | SerializeablBigIntegerDatum
  | SerializeableNumberDatum;

export type SerializeableNumberNode = BaseSerializeableNode<
  SerializeableNodeName.Number,
  SerializeableNumberNodeDatum
>;

// String
export type SerializeableMultilineStringDatum = {
  typeName: CustomDatumTypeName.String;
  lineList: string[];
  isMultiline: true;
};

export type SerializeableSingeLineStringMetadata<
  TValue extends string = string,
> = {
  typeName: CustomDatumTypeName.String;
  value: TValue;
  isMultiline: false;
};

export type SerializeableSymbolMetadata = {
  typeName: CustomDatumTypeName.Symbol;
  description: string;
  referenceId: string;
};

export type SerializeableStringNodeMetadata =
  | SerializeableMultilineStringDatum
  | SerializeableSingeLineStringMetadata
  | SerializeableSymbolMetadata;

export type SerializeableStringNode = BaseSerializeableNode<
  SerializeableNodeName.String,
  SerializeableStringNodeMetadata
>;

// Object
export type SimpleSerializeableObjectEntry = [
  SerializeableBooleanNode | SerializeableNumberNode | SerializeableStringNode,
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  SerializeableNode,
];

// TODO: make a single source of truth for the predicate type, the list type in the comparison and "SimpleSerializeableObjectEntry"
export const isSimpleObjectEntryKey = (
  entry: [unknown, unknown],
): entry is [boolean | bigint | number | string | symbol, unknown] =>
  [
    CustomDatumTypeName.Boolean,
    CustomDatumTypeName.BigInteger,
    CustomDatumTypeName.Number,
    CustomDatumTypeName.String,
    CustomDatumTypeName.Symbol,
  ].includes(getCustomTypedDatum(entry[0]).typeName);

export type SerializeableCustomObjectInstanceMetadata = {
  typeName: CustomDatumTypeName.CustomObjectInstance;
  isSimple: true;
  entryList: SimpleSerializeableObjectEntry[];
  prototypeNameTuple: Tuple<string>;
};

export type SerializeableFunctionMetadata = {
  typeName: CustomDatumTypeName.Function;
  isSimple: true;
  entryList: SimpleSerializeableObjectEntry[];
};

export type SerializeableSimpleMapMetadata = {
  typeName: CustomDatumTypeName.Map;
  isSimple: true;
  entryList: SimpleSerializeableObjectEntry[];
  prototypeNameTuple: Tuple<string>;
};

export type SerializeableComplexMapMetadata = {
  typeName: CustomDatumTypeName.Map;
  isSimple: false;
  entryList: SerializeableListNode;
  prototypeNameTuple: Tuple<string>;
};

export type SerializeableRootObjectInstanceMetadata = {
  typeName: CustomDatumTypeName.RootObjectInstance;
  isSimple: true;
  entryList: SimpleSerializeableObjectEntry[];
  prototypeNameTuple: Tuple<string>;
};

export type SerializeableObjectNodeMetadata =
  | SerializeableCustomObjectInstanceMetadata
  | SerializeableFunctionMetadata
  | SerializeableSimpleMapMetadata
  | SerializeableComplexMapMetadata
  | SerializeableRootObjectInstanceMetadata;

export type SerializeableObjectNode = BaseSerializeableNode<
  SerializeableNodeName.Object,
  SerializeableObjectNodeMetadata
>;

export type SerializeableNode =
  | SerializeableBooleanNode
  | SerializeableListNode
  | SerializeableNullNode
  | SerializeableNumberNode
  | SerializeableObjectNode
  | SerializeableStringNode;
