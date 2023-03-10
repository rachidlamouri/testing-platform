import {
  CustomNotation,
  CustomNotationBigInt,
  CustomNotationBoolean,
  CustomNotationCircularReference,
  CustomNotationMultilineString,
  CustomNotationNull,
  CustomNotationNumber,
  CustomNotationObjectEntries,
  CustomNotationObjectEntry,
  CustomNotationObjectEntryRecord,
  CustomNotationObjectEntryTuple,
  CustomNotationSingleLineString,
  CustomNotationSymbol,
  CustomNotationTypeName,
  CustomNotationUndefined,
  ReferenceableCustomNotation,
} from './customNotation';
import { jsonUtils } from './json';
import { buildStruss } from './semantic-types/struss';

type CachedDatumWithCustomNotation = {
  datum: unknown;
  customNotation: ReferenceableCustomNotation;
};

type CachedPlaceholderUuid = string;

type CachedDatum = CachedDatumWithCustomNotation | CachedPlaceholderUuid;

class DatumCache extends Map<unknown, CachedDatum> {}

const undefinedCustomNotation: CustomNotationUndefined = {
  typeName: CustomNotationTypeName.UNDEFINED,
};

const toCustomNotation = (
  datum: unknown,
  cache: DatumCache,
): CustomNotation => {
  if (datum === null) {
    return datum satisfies CustomNotationNull;
  }

  switch (typeof datum) {
    case 'string':
      if (datum.includes('\n')) {
        return {
          typeName: CustomNotationTypeName.MULTILINE_STRING,
          lines: datum.split('\n'),
        } satisfies CustomNotationMultilineString;
      }

      return datum satisfies CustomNotationSingleLineString;
    case 'symbol': {
      const customNotation = cache.has(datum)
        ? ((cache.get(datum) as CachedDatumWithCustomNotation)
            .customNotation as CustomNotationSymbol)
        : ({
            typeName: CustomNotationTypeName.SYMBOL,
            uuid: buildStruss(),
            description: datum.description ?? '',
          } satisfies CustomNotationSymbol);

      cache.set(datum, {
        datum,
        customNotation,
      });

      return customNotation;
    }
    case 'number':
      return datum satisfies CustomNotationNumber;
    case 'bigint':
      return {
        typeName: CustomNotationTypeName.BIG_INT,
        value: datum.toString(),
      } satisfies CustomNotationBigInt;
    case 'boolean':
      return datum satisfies CustomNotationBoolean;
    case 'undefined': {
      return undefinedCustomNotation;
    }
    case 'function':
      throw Error('Function is not supported');
    default:
  }

  if (cache.has(datum)) {
    const cached = cache.get(datum) as CachedDatum;

    if (typeof cached === 'string') {
      /**
       * This happens when we attempt to serialize an array or object again, before we finish serializing it the first time.
       * This might seem obvious, but I kept forgetting how this happens, so keep that in mind before you delete this note.
       * Maybe we don't need a note on why we should keep a note, but if we deleted the previous line then we'd wonder why we have the first line.
       */
      return {
        typeName: CustomNotationTypeName.CIRCULAR_REFERENCE,
        uuid: cached,
      } satisfies CustomNotationCircularReference;
    }

    return cached.customNotation;
  }

  const referenceUuid = buildStruss();

  cache.set(datum, referenceUuid);

  if (Array.isArray(datum)) {
    const values = datum.map((item) => toCustomNotation(item, cache));

    return values;
  }
  let unknownEntries: [unknown, unknown][];

  if (datum instanceof Map) {
    unknownEntries = [...datum.entries()];
  } else {
    unknownEntries = Reflect.ownKeys(datum).map((key) => {
      const value = (datum as Record<string | symbol, unknown>)[key];
      return [key, value];
    });
  }

  let entries: CustomNotationObjectEntries;

  const originalEntries: CustomNotationObjectEntryTuple =
    unknownEntries.map<CustomNotationObjectEntry>(([key, value]) => [
      toCustomNotation(key, cache),
      toCustomNotation(value, cache),
    ]);

  if (originalEntries.every(([key]) => typeof key === 'string')) {
    entries = Object.fromEntries(
      originalEntries,
    ) as CustomNotationObjectEntryRecord;
  } else {
    entries = originalEntries;
  }

  return entries;
};

export const serialize = (datum: unknown): string => {
  const cache = new DatumCache();
  const customNotation = toCustomNotation(datum, cache);

  return jsonUtils.multilineSerialize(customNotation);
};
