import { TypedTarget } from '../../../types/typedTarget';
import { ParseableOnDiskJsonFileTarget } from '../../file/jsonFile/jsonFileTarget';
import { OnDiskUtf8FileTarget } from '../../file/utf8File/utf8FileTarget';
import { ObjectTarget } from '../../type-script/objectTarget';
import { TargetTypeId } from '../targetTypeIds';

export type PackageBTarget = {
  directoryName: string;
  runTestsScript: OnDiskUtf8FileTarget;
  packageFile: ParseableOnDiskJsonFileTarget<ObjectTarget>;
  typeScriptConfigFile: ParseableOnDiskJsonFileTarget<ObjectTarget>;
};

export type PackageBTypedTarget = TypedTarget<
  TargetTypeId.PackageB,
  PackageBTarget
>;