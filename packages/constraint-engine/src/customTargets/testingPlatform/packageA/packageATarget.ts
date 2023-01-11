import { TypedTarget } from '../../../types/typedTarget';
import { JsonFileTarget } from '../../file/jsonFileTarget';
import { Utf8FileTarget } from '../../file/utf8FileTarget';
import { TestingPlatformTargetTypeId } from '../targetTypeIds';

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
