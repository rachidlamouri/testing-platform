import { TypedTarget } from '../../../types/typedTarget';
import { TestingPlatformTargetTypeId } from '../targetTypeIds';

export type TestingPlatformPackageDirectoryTarget = {
  directoryPath: string;
  index: number;
};

export type TestingPlatformPackageDirectoryTypedTarget = TypedTarget<
  TestingPlatformTargetTypeId.PackageDirectory,
  TestingPlatformPackageDirectoryTarget
>;
