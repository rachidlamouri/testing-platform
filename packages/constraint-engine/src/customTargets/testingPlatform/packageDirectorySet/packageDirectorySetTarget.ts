import { TypedTarget } from '../../../types/typedTarget';
import { TargetTypeId } from '../targetTypeIds';

export type PackageDirectorySetTarget = string[];

export type PackageDirectorySetTypedTarget = TypedTarget<
  TargetTypeId.PackageDirectorySet,
  PackageDirectorySetTarget
>;
