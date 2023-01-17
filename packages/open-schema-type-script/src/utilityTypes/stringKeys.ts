import { UnknownObject } from './unknownHelpers';

export type StringKeys<TObject extends UnknownObject> = Extract<
  keyof TObject,
  string
>;
