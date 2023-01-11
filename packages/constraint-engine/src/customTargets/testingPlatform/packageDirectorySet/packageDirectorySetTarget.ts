import { TypedTarget } from '../../../types/typedTarget';
import { TestingPlatformTargetTypeId } from '../targetTypeIds';

export type TestingPlatformPackageDirectorySetTarget = string[];

export type TestingPlatformPackageDirectorySetTypedTarget = TypedTarget<
  TestingPlatformTargetTypeId.PackageDirectorySet,
  TestingPlatformPackageDirectorySetTarget
>;
