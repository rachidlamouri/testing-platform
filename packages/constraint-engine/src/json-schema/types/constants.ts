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

export enum JsonTargetTypeId {
  Unknown = 'JSON:Unknown',
  String = 'JSON:String',
  Number = 'JSON:Number',
  Boolean = 'JSON:Boolean',
  Null = 'JSON:Null',
  Array = 'JSON:Array',
  Object = 'JSON:Object',
}

export const JSON_DATA_TYPE_TO_TARGET_TYPE_ID = {
  [JsonDataType.String]: JsonTargetTypeId.String,
  [JsonDataType.Number]: JsonTargetTypeId.Number,
  [JsonDataType.Boolean]: JsonTargetTypeId.Boolean,
  [JsonDataType.Null]: JsonTargetTypeId.Null,
  [JsonDataType.Array]: JsonTargetTypeId.Array,
  [JsonDataType.Object]: JsonTargetTypeId.Object,
} satisfies Record<JsonDataType, JsonTargetTypeId>;
