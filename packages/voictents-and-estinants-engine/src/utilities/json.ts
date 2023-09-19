type JsonString = string;

type JsonNumber = number;

type JsonBoolean = boolean;

type JsonNull = null;

// eslint-disable-next-line @typescript-eslint/no-use-before-define
type JsonArray = Json[];

// eslint-disable-next-line @typescript-eslint/no-use-before-define
type JsonTuple = readonly Json[];

type JsonList = JsonArray | JsonTuple;

// eslint-disable-next-line @typescript-eslint/no-use-before-define
type JsonObject = { [key: string]: Json };

export type Json =
  | JsonString
  | JsonNumber
  | JsonBoolean
  | JsonNull
  | JsonList
  | JsonObject;

export const jsonUtils = {
  lossyMultilineSerialize: (datum: unknown): string | Error => {
    try {
      return jsonUtils.multilineSerialize(datum as Json);
    } catch (error) {
      return error as Error;
    }
  },
  multilineSerialize: (datum: Json): string => {
    const stringified = JSON.stringify(
      datum,
      (key, value: unknown) => {
        if (typeof value === 'bigint') {
          return value.toString();
        }

        return value;
      },
      2,
    );
    if (stringified === undefined) {
      throw new Error(`Unable to stringify datum of type "${typeof datum}"`);
    }

    return stringified;
  },
  parse: (text: string): Json => JSON.parse(text) as Json,
};
