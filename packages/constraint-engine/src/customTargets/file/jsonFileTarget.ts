type BaseJsonFileTarget<T> = {
  filePath: string;
} & T;

export type ParseableOnDiskJsonFileTarget = BaseJsonFileTarget<{
  isOnDisk: true;
  stringContents: string;
  isParseable: true;
  parsedContents: unknown;
}>;

export type UnparseableOnDiskJsonFileTarget = BaseJsonFileTarget<{
  isOnDisk: true;
  stringContents: string;
  isParseable: false;
  parsedContents?: never;
}>;

export type NotOnDiskJsonFileTarget = BaseJsonFileTarget<{
  isOnDisk: false;
  stringContents?: never;
  isParseable?: never;
}>;

export type JsonFileTarget =
  | ParseableOnDiskJsonFileTarget
  | UnparseableOnDiskJsonFileTarget
  | NotOnDiskJsonFileTarget;
