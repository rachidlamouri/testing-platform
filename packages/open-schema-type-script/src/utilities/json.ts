export type JsonNull = null;
export type JsonString = string;
export type JsonNumber = number;
export type JsonBoolean = boolean;

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type JsonArray = Json[];

export type JsonObject = {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  [key: string]: Json;
};

export type Json =
  | JsonNull
  | JsonString
  | JsonNumber
  | JsonBoolean
  | JsonObject
  | JsonArray;
