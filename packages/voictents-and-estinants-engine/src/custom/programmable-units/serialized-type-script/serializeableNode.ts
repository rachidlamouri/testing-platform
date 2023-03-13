// import { CustomDatumTypeName } from '../../../utilities/typed-datum/customTypedDatum';
// import { TypeScriptObjectInstance } from '../../../utilities/typed-datum/type-script/object';

// export enum SerializeableNodeName {
//   Boolean = 'Boolean',
//   List = 'List',
//   Null = 'Null',
//   Number = 'Number',
//   Object = 'Object',
//   String = 'String',
// }

// type BaseSerializeableNode<
//   TNodeName extends SerializeableNodeName,
//   TDatum extends TypeScriptObjectInstance,
// > = {
//   nodeName: TNodeName;
//   datum: TDatum;
// };

// // Boolean
// export type SerializeableBooleanNode = BaseSerializeableNode<
//   SerializeableNodeName.Boolean,
//   { value: boolean }
// >;

// // List
// export type SerializeableListNode = BaseSerializeableNode<
//   SerializeableNodeName.List,
//   {
//     typeName: CustomDatumTypeName.Array | CustomDatumTypeName.Set;
//     // eslint-disable-next-line @typescript-eslint/no-use-before-define
//     valueList: SerializeableNode[];
//   }
// >;

// // Null
// export type SerializeableNullDatum = {
//   typeName: CustomDatumTypeName.Null;
//   value: null;
// };

// export type SerializeableUndefinedDatum = {
//   typeName: CustomDatumTypeName.Undefined;
//   value: undefined;
// };

// export type SerializeableNullNodeDatum =
//   | SerializeableNullDatum
//   | SerializeableUndefinedDatum;

// export type SerializeableNullNode = BaseSerializeableNode<
//   SerializeableNodeName.Null,
//   SerializeableNullNodeDatum
// >;

// // Number
// export type SerializeableNumberDatum = {
//   typeName: CustomDatumTypeName.BigInteger;
//   value: bigint;
// };

// export type SerializeablBigIntegerDatum = {
//   typeName: CustomDatumTypeName.BigInteger;
//   value: bigint;
// };

// export type SerializeableNumberNodeDatum =
//   | SerializeablBigIntegerDatum
//   | SerializeableNumberDatum;

// export type SerializeableNumberNode = BaseSerializeableNode<
//   SerializeableNodeName.Number,
//   SerializeableNumberNodeDatum
// >;

// // String
// export type SerializeableMultilineStringDatum = {
//   typeName: CustomDatumTypeName.String;
//   value: string;
//   isMultiline: true;
// };

// export type SerializeableSingeLineStringDatum = {
//   typeName: CustomDatumTypeName.String;
//   value: string;
//   isMultiline: false;
// };

// export type SerializeableSymbolDatum = {
//   typeName: CustomDatumTypeName.Symbol;
//   referenceId: string;
// };

// export type SerializeableStringNodeDatum =
//   | SerializeableMultilineStringDatum
//   | SerializeableSingeLineStringDatum
//   | SerializeableSymbolDatum;

// export type SerializeableStringNode = BaseSerializeableNode<
//   SerializeableNodeName.String,
//   SerializeableStringNodeDatum
// >;

// // Object
// type SimpleObjectEntry = [
//   SerializeableBooleanNode | SerializeableNumberNode | SerializeableStringNode,
//   // eslint-disable-next-line @typescript-eslint/no-use-before-define
//   SerializeableNode,
// ];

// // eslint-disable-next-line @typescript-eslint/no-use-before-define
// type ComplexObjectEntry = [SerializeableNode, SerializeableNode];

// export type SerializeableCustomObjectInstanceDatum = {
//   nodeName: SerializeableNodeName.Object;
//   typeName: CustomDatumTypeName.CustomObjectInstance;
//   isSimple: true;
//   entryList: SimpleObjectEntry[];
//   prototypeChainList: string[];
// };

// export type SerializeableFunctionDatum = {
//   nodeName: SerializeableNodeName.Object;
//   typeName: CustomDatumTypeName.Function;
//   isSimple: true;
//   entryList: [
//     {
//       nodeName: SerializeableNodeName.String;
//       datum: {
//         typeName: CustomDatumTypeName.String;
//         isMultiline: false;
//         value: 'name';
//       };
//     },
//     SerializeableStringNode,
//   ];
// };

// export type SerializeableSimpleMapDatum = {
//   nodeName: SerializeableNodeName.Object;
//   typeName: CustomDatumTypeName.Map;
//   isSimple: true;
//   entryList: SimpleObjectEntry[];
// };

// export type SerializeableComplexMapDatum = {
//   nodeName: SerializeableNodeName.Object;
//   typeName: CustomDatumTypeName.Map;
//   isSimple: false;
//   entryList: ComplexObjectEntry[];
// };

// export type SerializeableRootObjectInstanceDatum = {
//   nodeName: SerializeableNodeName.Object;
//   typeName: CustomDatumTypeName.RootObjectInstance;
//   isSimple: true;
//   entryList: SimpleObjectEntry[];
// };

// export type SerializeableObjectNodeDatum =
//   | SerializeableCustomObjectInstanceDatum
//   | SerializeableFunctionDatum
//   | SerializeableSimpleMapDatum
//   | SerializeableComplexMapDatum
//   | SerializeableRootObjectInstanceDatum;

// export type SerializeableObjectNode = BaseSerializeableNode<
//   SerializeableNodeName.Object,
//   SerializeableObjectNodeDatum
// >;

// export type SerializeableNode =
//   | SerializeableBooleanNode
//   | SerializeableListNode
//   | SerializeableNullNode
//   | SerializeableNumberNode
//   | SerializeableObjectNode
//   | SerializeableStringNode;
