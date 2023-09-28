export type TypeScriptArray = unknown[];

export type TypeScriptSet = Set<unknown>;

export type TypeScriptMap = Map<unknown, unknown>;

export type TypeScriptObjectInstanceKey = string | number | symbol;

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

const recursivelyGetEntryList = (
  originalDatum: TypeScriptObjectInstance,
  isPrototype: boolean,
  datumOrPrototype: TypeScriptObjectInstance,
  // "entryListList" is an accumulator that groups entries by prototype
  entryListList: TypeScriptObjectInstanceEntryList[],
): void => {
  const descriptorByKey = Object.getOwnPropertyDescriptors(datumOrPrototype);
  const symbolList = Object.getOwnPropertySymbols(datumOrPrototype);
  const descriptorKeyList = Object.keys(descriptorByKey).filter(
    (key) => !isPrototype || key !== 'constructor',
  );

  const entryList = [...descriptorKeyList, ...symbolList].map((key) => {
    return [key, originalDatum[key]] as TypeScriptObjectInstanceEntry;
  });

  entryListList.push(entryList);

  const prototype = Object.getPrototypeOf(
    datumOrPrototype,
  ) as TypeScriptObjectInstance;

  if (prototype !== Object.prototype) {
    recursivelyGetEntryList(originalDatum, true, prototype, entryListList);
  }
};

export const getTypeScriptObjectEntryList = (
  datum: TypeScriptObjectInstance,
): TypeScriptObjectInstanceEntryList => {
  const entryListList: TypeScriptObjectInstanceEntryList[] = [];

  recursivelyGetEntryList(datum, false, datum, entryListList);

  // note: this is reversed so prototype entries are rendered first. which means this
  // function is concerned with rendering stuff, which is probably bad
  entryListList.reverse();

  const entryList = entryListList.flat();
  return entryList;
};
