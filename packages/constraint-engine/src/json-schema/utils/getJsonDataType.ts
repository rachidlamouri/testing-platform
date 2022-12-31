import { JsonDataType } from '../types/constants';
import { JsonTarget } from '../types/targets';

enum DataType {
  string = 'string',
  number = 'number',
  bigint = 'bigint',
  boolean = 'boolean',
  symbol = 'symbol',
  undefined = 'undefined',
  object = 'object',
  function = 'function',
}

type JsonCompatibleDataType = Extract<
  DataType,
  DataType.string | DataType.number | DataType.boolean | DataType.object
>;

export const getJsonDataType = (data: JsonTarget): JsonDataType => {
  const dataType = typeof data as JsonCompatibleDataType;

  let jsonDataType: JsonDataType;
  if (dataType === DataType.string) {
    jsonDataType = JsonDataType.String;
  } else if (dataType === DataType.number) {
    jsonDataType = JsonDataType.Number;
  } else if (dataType === DataType.boolean) {
    jsonDataType = JsonDataType.Boolean;
  } else if (dataType === DataType.object && data === null) {
    jsonDataType = JsonDataType.Null;
  } else if (dataType === DataType.object && Array.isArray(data)) {
    jsonDataType = JsonDataType.Array;
  } else {
    jsonDataType = JsonDataType.Object;
  }

  return jsonDataType;
};
