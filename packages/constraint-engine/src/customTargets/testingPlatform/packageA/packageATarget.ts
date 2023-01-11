import { TypedTarget } from '../../../types/typedTarget';
import { JsonFileTarget } from '../../file/jsonFile/jsonFileTarget';
import { Utf8FileTarget } from '../../file/utf8File/utf8FileTarget';
import { TargetTypeId } from '../targetTypeIds';

export type PackageATarget = {
  directoryName: string;
  runTestsScript: Utf8FileTarget;
  packageFile: JsonFileTarget;
  typeScriptConfigFile: JsonFileTarget;
};

export type PackageATypedTarget = TypedTarget<
  TargetTypeId.PackageA,
  PackageATarget
>;
