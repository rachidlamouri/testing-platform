type CachedDatum = {
  datum: unknown;
  serialization: string;
};

export const serialize = (
  datum: unknown,
  cache = new Map<unknown, CachedDatum | null>(),
): string => {
  if (datum === null) {
    return 'NULL|null';
  }

  switch (typeof datum) {
    case 'string':
      return `STRI|${datum}`;
    case 'number':
      return `NUMB|${datum}`;
    case 'bigint':
      return `BIGI|${datum}`;
    case 'boolean':
      return `BOOL|${datum ? 'true' : 'false'}`;
    case 'symbol':
      return `SYMB|${datum.description ?? ''}`;
    case 'undefined':
      return 'UNDE|undefined';
    case 'function':
      return `FUNC|${datum.name}`;
    default:
  }

  if (cache.has(datum)) {
    // TODO: create a local identifier that we can use to provide a path to the referenced item

    const cachedValue = cache.get(datum) as CachedDatum | null;

    if (cachedValue === null) {
      // TODO: investigate how this happens further
      return 'CIRC: ???';
    }

    return cachedValue.serialization;
  }

  cache.set(datum, null);

  if (Array.isArray(datum)) {
    const elementSerializations = datum.map((item) => serialize(item, cache));

    const serialization = [
      'ARRA: [',
      ...elementSerializations.map((text) =>
        text
          .split('\n')
          .map((line) => `  ${line}`)
          .join('\n'),
      ),
      ']',
    ].join('\n');

    cache.set(datum, { datum, serialization });

    return serialization;
  }

  let entries: [unknown, unknown][];

  const constructorName = datum.constructor.name;

  if (datum instanceof Map) {
    entries = [...datum.entries()];
  } else {
    entries = Reflect.ownKeys(datum).map((key) => {
      const value = (datum as Record<string | symbol, unknown>)[key];

      return [key, value];
    });
  }

  type Property = {
    serializedKey: string;
    serializedValue: string;
  };

  const properties: Property[] = entries.map<Property>(([key, value]) => ({
    serializedKey: serialize(key, cache),
    serializedValue: serialize(value, cache),
  }));

  const constructorId = constructorName.toUpperCase().slice(0, 4);

  const serialization = [
    `${constructorId}: {`,
    ...properties.map(({ serializedKey, serializedValue }) => {
      return [
        `  [${serializedKey}]:`,
        ...serializedValue.split('\n').map((line) => `    ${line}`),
      ].join('\n');
    }),
    '}',
  ].join('\n');

  cache.set(datum, { datum, serialization });

  return serialization;
};
