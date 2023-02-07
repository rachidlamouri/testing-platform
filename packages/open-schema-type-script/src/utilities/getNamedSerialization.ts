enum TypeScriptDatumTypeName {
  Array = 'Array',
  Bigint = 'Bigint',
  Boolean = 'Boolean',
  Function = 'Function',
  Null = 'Null',
  Number = 'Number',
  Object = 'Object',
  String = 'String',
  Symbol = 'Symbol',
  Undefined = 'Undefined',
  Unknown = 'Unknown',
}

type NamedSerialization = {
  typeName: string;
  text: string;
};

export const getNamedSerialization = (datum: unknown): NamedSerialization => {
  if (datum === null) {
    return {
      typeName: TypeScriptDatumTypeName.Null,
      text: 'NULL|null',
    };
  }

  switch (typeof datum) {
    case 'string':
      return {
        typeName: TypeScriptDatumTypeName.String,
        text: `STRI|${datum}`,
      };
    case 'number':
      return {
        typeName: TypeScriptDatumTypeName.Number,
        text: `NUMB|${datum}`,
      };
    case 'bigint':
      return {
        typeName: TypeScriptDatumTypeName.Bigint,
        text: `BIGI|${datum}`,
      };
    case 'boolean':
      return {
        typeName: TypeScriptDatumTypeName.Boolean,
        text: `BOOL|${datum ? 'true' : 'false'}`,
      };
    case 'symbol':
      return {
        typeName: TypeScriptDatumTypeName.Symbol,
        text: `SYMB|${datum.toString()}`,
      };
    case 'undefined':
      return {
        typeName: TypeScriptDatumTypeName.Undefined,
        text: 'UNDE|undefined',
      };
    case 'function':
      return {
        typeName: TypeScriptDatumTypeName.Function,
        text: `FUNC|${datum.name}`,
      };
    default:
  }

  if (Array.isArray(datum)) {
    const elementSerializations = datum.map(getNamedSerialization);

    return {
      typeName: TypeScriptDatumTypeName.Array,
      text: [
        'ARRA: [',
        ...elementSerializations.map(({ text }) =>
          text
            .split('\n')
            .map((line) => `  ${line}`)
            .join('\n'),
        ),
        ']',
      ].join('\n'),
    };
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
    key: NamedSerialization;
    value: NamedSerialization;
  };

  const properties: Property[] = entries.map<Property>(([key, value]) => ({
    key: getNamedSerialization(key),
    value: getNamedSerialization(value),
  }));

  const constructorId = constructorName.toUpperCase().slice(0, 4);

  return {
    typeName: TypeScriptDatumTypeName.Object,
    text: [
      `${constructorId}: {`,
      ...properties.map(({ key, value }) => {
        return [
          `  [${key.text}]:`,
          ...value.text.split('\n').map((line) => `    ${line}`),
        ].join('\n');
      }),
      '}',
    ].join('\n'),
  };
};
