import { TypedTarget } from '../../../types/typedTarget';
import { TargetTypeId } from '../targetTypeId';

export type PackageDirectorySetTarget = string[];

export type PackageDirectorySetTypedTarget = TypedTarget<
  TargetTypeId.PackageDirectorySet,
  PackageDirectorySetTarget
>;
