import { TypedTarget } from '../../../types/typedTarget';
import { ParseableOnDiskJsonFileTarget } from '../../file/jsonFileTarget';
import { OnDiskUtf8FileTarget } from '../../file/utf8FileTarget';
import { ObjectTarget } from '../../type-script/objectTarget';
import { TestingPlatformTargetTypeId } from '../targetTypeIds';
import { TestingPlatformConfigurationTarget } from './packageConfigurationTarget';

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
