import { TypedTarget } from '../../types/typedTarget';
import { JsonFileTarget } from '../file/jsonFileTarget';

export enum TestingPlatformTargetTypeId {
  PackageDirectorySet = 'PackageDirectorySet',
  PackageDirectory = 'PackageDirectory',
  Package = 'Package',
}

export type TestingPlatformPackageDirectorySetTarget = string[];

export type TestingPlatformPackageDirectorySetTypedTarget = TypedTarget<
  TestingPlatformTargetTypeId.PackageDirectorySet,
  TestingPlatformPackageDirectorySetTarget
>;

export type TestingPlatformPackageDirectoryTarget = {
  directoryPath: string;
  index: number;
};

export type TestingPlatformPackageDirectoryTypedTarget = TypedTarget<
  TestingPlatformTargetTypeId.PackageDirectory,
  TestingPlatformPackageDirectoryTarget
>;

export type TestingPlatformPackageTarget = {
  directoryName: string;
  packageFile: JsonFileTarget;
  typeScriptConfigFile: JsonFileTarget;
};

export type TestingPlatformPackageTypedTarget = TypedTarget<
  TestingPlatformTargetTypeId.Package,
  TestingPlatformPackageTarget
>;
