export type TypeScriptArray = unknown[];

export type TypeScriptSet = Set<unknown>;

export type TypeScriptMapEntry = [unknown, unknown];

export type TypeScriptMapEntryList = TypeScriptMapEntry[];

export type TypeScriptMap = Map<unknown, unknown>;

export type TypeScriptObjectInstanceKey = string | number | symbol;

export type TypeScriptObjectInstance = Record<
  TypeScriptObjectInstanceKey,
  unknown
>;

export type TypeScriptObjectInstanceEntry = [
  TypeScriptObjectInstanceKey,
  unknown,
];

export type TypeScriptObjectInstanceEntryList = TypeScriptObjectInstanceEntry[];

export type TypeScriptObject =
  | null
  | TypeScriptArray
  | TypeScriptSet
  | TypeScriptMap
  | TypeScriptObjectInstance;

export const getTypeScriptObjectEntryList = (
  datum: TypeScriptObjectInstance,
): TypeScriptObjectInstanceEntryList => {
  const simpleEntryList = Reflect.ownKeys(
    datum,
  ).map<TypeScriptObjectInstanceEntry>((key) => {
    const value = datum[key];

    return [key, value];
  });

  return simpleEntryList;
};
