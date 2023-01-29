import { TypedTarget } from '../../../types/typedTarget';
import { TargetTypeId } from '../targetTypeId';

type BaseJsonFileTarget<T> = {
  filePath: string;
} & T;

export type ParseableOnDiskJsonFileTarget<TParsedContents = unknown> =
  BaseJsonFileTarget<{
    isOnDisk: true;
    stringContents: string;
    isParseable: true;
    parsedContents: TParsedContents;
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

export type JsonFileTypedTarget = TypedTarget<
  TargetTypeId.JsonFile,
  JsonFileTarget
>;
