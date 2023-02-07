export const serialize = (datum: unknown): string => {
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
      return `SYMB|${datum.toString()}`;
    case 'undefined':
      return 'UNDE|undefined';
    case 'function':
      return `FUNC|${datum.name}`;
    default:
  }

  if (Array.isArray(datum)) {
    const elementSerializations = datum.map(serialize);

    return [
      'ARRA: [',
      ...elementSerializations.map((text) =>
        text
          .split('\n')
          .map((line) => `  ${line}`)
          .join('\n'),
      ),
      ']',
    ].join('\n');
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
    serializedKey: serialize(key),
    serializedValue: serialize(value),
  }));

  const constructorId = constructorName.toUpperCase().slice(0, 4);

  return [
    `${constructorId}: {`,
    ...properties.map(({ serializedKey, serializedValue }) => {
      return [
        `  [${serializedKey}]:`,
        ...serializedValue.split('\n').map((line) => `    ${line}`),
      ].join('\n');
    }),
    '}',
  ].join('\n');
};
