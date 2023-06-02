export type TypeScriptArray = unknown[];

export type TypeScriptSet = Set<unknown>;

export type TypeScriptMap = Map<unknown, unknown>;

type TypeScriptObjectInstanceKey = string | number | symbol;

export type TypeScriptObjectInstance = Record<
  TypeScriptObjectInstanceKey,
  unknown
>;

type TypeScriptObjectInstanceEntry = [TypeScriptObjectInstanceKey, unknown];

type TypeScriptObjectInstanceEntryList = TypeScriptObjectInstanceEntry[];

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
