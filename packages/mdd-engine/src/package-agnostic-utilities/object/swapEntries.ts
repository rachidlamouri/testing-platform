type ObjectWithSwappedEntries<TObject extends Record<string, string>> = {
  [Key in keyof TObject as TObject[Key]]: Key;
};

type ObjectEntry = [string, string];

/**
 * Swaps key value pairs so the value is the key and the key is the value
 */
export const swapEntries = <TObject extends Record<string, string>>(
  object: TObject,
): ObjectWithSwappedEntries<TObject> => {
  const swappedEntries = Object.entries(object).map<ObjectEntry>(
    ([key, value]) => [value, key],
  );
  const result = Object.fromEntries(swappedEntries);
  return result as ObjectWithSwappedEntries<TObject>;
};
