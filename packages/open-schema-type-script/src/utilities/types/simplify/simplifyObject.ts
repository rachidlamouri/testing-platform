import { UnknownObject } from '../unknownHelpers';

export type SimplifyObject<TObject extends UnknownObject> = {
  [TKey in keyof TObject]: TObject[TKey];
};
