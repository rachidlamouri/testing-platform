export const ROOT_JSON_DATA_TARGET_PATH = 'data';
export type RootJsonDataTargetPath = typeof ROOT_JSON_DATA_TARGET_PATH;

export enum JsonDataType {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  Array = 'array',
  Object = 'object',
  Null = 'null',
}

export enum JsonMetaTargetTypeId {
  UnknownType = 'JSON:UnknownType',
  KnownType = 'JSON:KnownType',
}
