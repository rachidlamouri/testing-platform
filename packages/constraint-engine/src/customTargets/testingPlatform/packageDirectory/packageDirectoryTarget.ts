import { TypedTarget } from '../../../types/typedTarget';
import { TargetTypeId } from '../targetTypeId';

export type PackageDirectoryTarget = {
  directoryPath: string;
  index: number;
};

export type PackageDirectoryTypedTarget = TypedTarget<
  TargetTypeId.PackageDirectory,
  PackageDirectoryTarget
>;
