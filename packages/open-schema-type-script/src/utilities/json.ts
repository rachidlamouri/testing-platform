export type JsonNull = null;
export type JsonString = string;
export type JsonNumber = number;
export type JsonBoolean = boolean;

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type JsonArray = Json[];

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type JsonTuple = readonly Json[];

export type JsonObject = {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  [key: string]: Json;
};

export type Json =
  | JsonNull
  | JsonString
  | JsonNumber
  | JsonBoolean
  | JsonArray
  | JsonTuple
  | JsonObject;
