import { TypedTarget } from '../../../types/typedTarget';
import { ParseableOnDiskJsonFileTarget } from '../../file/jsonFileTarget';
import { OnDiskUtf8FileTarget } from '../../file/utf8FileTarget';
import { ObjectTarget } from '../../type-script/objectTarget';
import { TestingPlatformTargetTypeId } from '../targetTypeIds';

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
