import { getPrototypeNameTuple } from '../object/getPrototypeNameTuple';
import {
  CustomDatumTypeName,
  CustomTypedArray,
  CustomTypedBigInteger,
  CustomTypedBoolean,
  CustomTypedCustomObjectInstance,
  CustomTypedFunction,
  CustomTypedMap,
  CustomTypedNull,
  CustomTypedNumber,
  CustomTypedRootObjectInstance,
  CustomTypedSet,
  CustomTypedString,
  CustomTypedSymbol,
  CustomTypedUndefined,
  getCustomTypedDatum,
} from '../typed-datum/customTypedDatum';
import { getTypeScriptObjectEntryList } from '../object/typeScriptObject';
import {
  isSimpleObjectEntryKey,
  SerializeableBooleanNode,
  SerializeableListNode,
  SerializeableNode,
  SerializeableNodeName,
  SerializeableNullDatum,
  SerializeableNullNode,
  SerializeableNumberNode,
  SerializeableObjectNode,
  SerializeableStringNode,
  SimpleSerializeableObjectEntry,
} from './serializeableNode';

let referenceCount = -1;
const symbolReferenceMap = new Map<symbol, number>();

type MappedSerializeableNode<TDatum> =
  // this comment forces prettier to make this readable >:(
  TDatum extends CustomTypedBoolean['datum']
    ? SerializeableBooleanNode
    : TDatum extends CustomTypedArray['datum'] | CustomTypedSet['datum']
    ? SerializeableListNode
    : TDatum extends CustomTypedNull['datum'] | CustomTypedUndefined['datum']
    ? SerializeableNullDatum
    : TDatum extends CustomTypedBigInteger['datum'] | CustomTypedNumber['datum']
    ? SerializeableNumberNode
    : TDatum extends
        | CustomTypedCustomObjectInstance['datum']
        | CustomTypedFunction['datum']
        | CustomTypedMap['datum']
        | CustomTypedRootObjectInstance['datum']
    ? SerializeableObjectNode
    : TDatum extends CustomTypedString['datum'] | CustomTypedSymbol['datum']
    ? SerializeableStringNode
    : SerializeableNode;

const CIRCULAR_REFERENCE_SYMBOL = Symbol('CIRCULAR REFERENCE');

const buildSerializeableNode3 = <TDatum>(
  inputDatum: TDatum,
  cache: Set<unknown>,
): MappedSerializeableNode<TDatum> => {
  const isObject = typeof inputDatum === 'object' && inputDatum !== null;

  if (isObject && cache.has(inputDatum)) {
    // TODO: this cast is definitely not right
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return buildSerializeableNode2(
      CIRCULAR_REFERENCE_SYMBOL,
      cache,
    ) as unknown as MappedSerializeableNode<TDatum>;
  }

  if (isObject) {
    cache.add(inputDatum);
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return buildSerializeableNode2(inputDatum, cache);
};

const buildSerializeableNode2 = <TDatum>(
  inputDatum: TDatum,
  cache: Set<unknown>,
): MappedSerializeableNode<TDatum> => {
  const { typeName, datum } = getCustomTypedDatum(inputDatum);

  switch (typeName) {
    // Boolean
    case CustomDatumTypeName.Boolean:
      return {
        nodeName: SerializeableNodeName.Boolean,
        metadata: {
          value: datum,
        },
      } satisfies SerializeableBooleanNode as MappedSerializeableNode<TDatum>;

    // List
    case CustomDatumTypeName.Array:
      return {
        nodeName: SerializeableNodeName.List,
        metadata: {
          typeName,
          valueTuple: datum.map((element) => {
            const serializeableElement = buildSerializeableNode3(
              element,
              cache,
            );
            return serializeableElement;
          }),
        },
        // TODO: investigate this broken cast
      } satisfies SerializeableListNode as unknown as MappedSerializeableNode<TDatum>;
    case CustomDatumTypeName.Set:
      return {
        nodeName: SerializeableNodeName.List,
        metadata: {
          typeName,
          valueTuple: [...datum].map((element) => {
            const serializeableElement = buildSerializeableNode3(
              element,
              cache,
            );
            return serializeableElement;
          }),
        },
        // TODO: investigate this broken cast
      } satisfies SerializeableListNode as unknown as MappedSerializeableNode<TDatum>;

    // Null
    case CustomDatumTypeName.Null:
      return {
        nodeName: SerializeableNodeName.Null,
        metadata: {
          typeName,
          value: datum,
        },
      } satisfies SerializeableNullNode as MappedSerializeableNode<TDatum>;
    case CustomDatumTypeName.Undefined:
      return {
        nodeName: SerializeableNodeName.Null,
        metadata: {
          typeName,
          value: datum,
        },
      } satisfies SerializeableNullNode as MappedSerializeableNode<TDatum>;

    // Number
    case CustomDatumTypeName.BigInteger:
      return {
        nodeName: SerializeableNodeName.Number,
        metadata: {
          typeName,
          value: datum,
        },
      } satisfies SerializeableNumberNode as MappedSerializeableNode<TDatum>;
    case CustomDatumTypeName.Number:
      return {
        nodeName: SerializeableNodeName.Number,
        metadata: {
          typeName,
          value: datum,
        },
      } satisfies SerializeableNumberNode as MappedSerializeableNode<TDatum>;

    // Object
    case CustomDatumTypeName.CustomObjectInstance: {
      const entryList = getTypeScriptObjectEntryList(datum);

      const serializeableEntryList =
        entryList.map<SimpleSerializeableObjectEntry>(([key, value]) => {
          const keyNode = buildSerializeableNode3(key, cache);
          const valueNode = buildSerializeableNode3(value, cache);
          return [keyNode, valueNode];
        });

      return {
        nodeName: SerializeableNodeName.Object,
        metadata: {
          typeName,
          isSimple: true,
          entryList: serializeableEntryList,
          prototypeNameTuple: getPrototypeNameTuple(datum),
        },
      } satisfies SerializeableObjectNode as unknown as MappedSerializeableNode<TDatum>;
    }
    case CustomDatumTypeName.Function: {
      const serializeableFunctionNameEntry: SimpleSerializeableObjectEntry = [
        buildSerializeableNode3('name', cache),
        buildSerializeableNode3(datum.name, cache),
      ];

      return {
        nodeName: SerializeableNodeName.Object,
        metadata: {
          typeName,
          isSimple: true,
          entryList: [serializeableFunctionNameEntry],
        },
      } satisfies SerializeableObjectNode as MappedSerializeableNode<TDatum>;
    }
    case CustomDatumTypeName.Map: {
      const entryList = [...datum.entries()];

      const isSimple = entryList.every(isSimpleObjectEntryKey);

      if (isSimple) {
        const serializeableEntryList =
          entryList.map<SimpleSerializeableObjectEntry>(([key, value]) => {
            const keyNode = buildSerializeableNode3(key, cache);
            const valueNode = buildSerializeableNode3(value, cache);
            return [keyNode, valueNode];
          });

        return {
          nodeName: SerializeableNodeName.Object,
          metadata: {
            typeName,
            isSimple,
            entryList: serializeableEntryList,
            prototypeNameTuple: getPrototypeNameTuple(datum),
          },
          // TODO: investigate this broken cast
        } satisfies SerializeableObjectNode as unknown as MappedSerializeableNode<TDatum>;
      }

      const serializeableEntryList = buildSerializeableNode3(entryList, cache);

      return {
        nodeName: SerializeableNodeName.Object,
        metadata: {
          typeName,
          isSimple,
          entryList: serializeableEntryList,
          prototypeNameTuple: getPrototypeNameTuple(datum),
        },
        // TODO: investigate this broken cast
      } satisfies SerializeableObjectNode as unknown as MappedSerializeableNode<TDatum>;
    }
    case CustomDatumTypeName.RootObjectInstance: {
      const entryList = getTypeScriptObjectEntryList(datum);

      const serializeableEntryList =
        entryList.map<SimpleSerializeableObjectEntry>(([key, value]) => {
          const keyNode = buildSerializeableNode3(key, cache);
          const valueNode = buildSerializeableNode3(value, cache);
          return [keyNode, valueNode];
        });

      return {
        nodeName: SerializeableNodeName.Object,
        metadata: {
          typeName,
          isSimple: true,
          entryList: serializeableEntryList,
          prototypeNameTuple: getPrototypeNameTuple(datum),
        },
      } satisfies SerializeableObjectNode as unknown as MappedSerializeableNode<TDatum>;
    }

    // String
    case CustomDatumTypeName.String: {
      const isMultiline = datum.includes('\n');

      if (isMultiline) {
        return {
          nodeName: SerializeableNodeName.String,
          metadata: {
            typeName,
            isMultiline,
            lineList: datum.split('\n'),
          },
        } satisfies SerializeableStringNode as MappedSerializeableNode<TDatum>;
      }

      return {
        nodeName: SerializeableNodeName.String,
        metadata: {
          typeName,
          isMultiline,
          value: datum,
        },
      } satisfies SerializeableStringNode as MappedSerializeableNode<TDatum>;
    }
    case CustomDatumTypeName.Symbol: {
      const referenceNumber =
        symbolReferenceMap.get(datum) ??
        ((referenceCount += 1), referenceCount);
      symbolReferenceMap.set(datum, referenceNumber);

      return {
        nodeName: SerializeableNodeName.String,
        metadata: {
          typeName,
          description: datum.description ?? '',
          referenceId: `"Symbol ${referenceNumber}"`,
        },
      } satisfies SerializeableStringNode as MappedSerializeableNode<TDatum>;
    }
  }
};

/**
 * Gets metadata for how to serialize a datum based on its data type
 */
export const buildSerializeableNode = <TDatum>(
  inputDatum: TDatum,
): MappedSerializeableNode<TDatum> =>
  buildSerializeableNode3(inputDatum, new Set());
