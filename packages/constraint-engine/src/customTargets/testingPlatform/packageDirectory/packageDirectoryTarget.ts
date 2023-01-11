import { TypedTarget } from '../../../types/typedTarget';
import { TargetTypeId } from '../targetTypeIds';

export type PackageDirectoryTarget = {
  directoryPath: string;
  index: number;
};

export type PackageDirectoryTypedTarget = TypedTarget<
  TargetTypeId.PackageDirectory,
  PackageDirectoryTarget
>;
