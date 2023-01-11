import { TypedTarget } from '../../types/typedTarget';
import {
  JsonFileTarget,
  ParseableOnDiskJsonFileTarget,
} from '../file/jsonFileTarget';
import { OnDiskUtf8FileTarget, Utf8FileTarget } from '../file/utf8FileTarget';

export enum TestingPlatformTargetTypeId {
  PackageDirectorySet = 'PackageDirectorySet',
  PackageDirectory = 'PackageDirectory',
  PackageA = 'PackageA',
  PackageB = 'PackageB',
  PackageC = 'PackageC',
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

export type TestingPlatformPackageATarget = {
  directoryName: string;
  runTestsScript: Utf8FileTarget;
  packageFile: JsonFileTarget;
  typeScriptConfigFile: JsonFileTarget;
};

export type TestingPlatformPackageATypedTarget = TypedTarget<
  TestingPlatformTargetTypeId.PackageA,
  TestingPlatformPackageATarget
>;

export type ObjectTarget = Record<string, unknown>;

export type TestingPlatformPackageBTarget = {
  directoryName: string;
  runTestsScript: OnDiskUtf8FileTarget;
  packageFile: ParseableOnDiskJsonFileTarget<ObjectTarget>;
  typeScriptConfigFile: ParseableOnDiskJsonFileTarget<ObjectTarget>;
};

export type TestingPlatformPackageBTypedTarget = TypedTarget<
  TestingPlatformTargetTypeId.PackageB,
  TestingPlatformPackageBTarget
>;

export enum PackageConfigurationTypeId {
  TestFramework = 'TestFramework',
  NonTestFramework = 'NonTestFramework',
}

export type TestingPlatformConfigurationTarget = {
  typeId: PackageConfigurationTypeId;
};

export type PackageCPackageFileContentsTarget = {
  testingPlatformConfiguration: TestingPlatformConfigurationTarget;
  [key: string]: unknown;
};

export type PackageCPackageFileTarget =
  ParseableOnDiskJsonFileTarget<PackageCPackageFileContentsTarget>;

export type TestingPlatformPackageCTarget = {
  directoryName: string;
  runTestsScript: OnDiskUtf8FileTarget;
  packageFile: PackageCPackageFileTarget;
  typeScriptConfigFile: ParseableOnDiskJsonFileTarget<ObjectTarget>;
};

export type TestingPlatformPackageCTypedTarget = TypedTarget<
  TestingPlatformTargetTypeId.PackageC,
  TestingPlatformPackageCTarget
>;
