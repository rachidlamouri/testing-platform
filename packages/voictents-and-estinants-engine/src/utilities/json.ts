export type JsonString = string;

export type JsonNumber = number;

export type JsonBoolean = boolean;

export type JsonNull = null;

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type JsonArray = Json[];

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type JsonTuple = readonly Json[];

export type JsonList = JsonArray | JsonTuple;

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type JsonObject = { [key: string]: Json };

export type Json =
  | JsonString
  | JsonNumber
  | JsonBoolean
  | JsonNull
  | JsonArray
  | JsonTuple
  | JsonObject;

export type ToJson<T extends Json> = T;

export const jsonUtils = {
  multilineSerialize: (datum: Json): string => JSON.stringify(datum, null, 2),
  parse: (text: string): Json => JSON.parse(text) as Json,
};
