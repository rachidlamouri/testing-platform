import { TypedTarget } from '../../../types/typedTarget';
import { JsonFileTarget } from '../../file/jsonFile/jsonFileTarget';
import { Utf8FileTarget } from '../../file/utf8File/utf8FileTarget';
import { BasePackage } from '../basePackage';
import { TargetTypeId } from '../targetTypeIds';

export type PackageATarget = BasePackage<{
  packageFile: JsonFileTarget;
  typeScriptConfigFile: JsonFileTarget;
  runTestsScript: Utf8FileTarget;
}>;

export type PackageATypedTarget = TypedTarget<
  TargetTypeId.PackageA,
  PackageATarget
>;
