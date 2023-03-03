export type SimplifyObject<TObject extends object> = {
  [TKey in keyof TObject]: TObject[TKey];
};
