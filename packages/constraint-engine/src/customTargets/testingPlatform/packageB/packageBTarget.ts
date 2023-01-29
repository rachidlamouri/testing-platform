import { TypedTarget } from '../../../types/typedTarget';
import { ParseableOnDiskJsonFileTarget } from '../../file/jsonFile/jsonFileTarget';
import { OnDiskUtf8FileTarget } from '../../file/utf8File/utf8FileTarget';
import { ObjectTarget } from '../../type-script/objectTarget';
import { BasePackage } from '../basePackage';
import {
  CategorizedTestFileMetadataTarget,
  SupportedTestFileType,
} from '../categorizedTestFileMetadata';
import { TargetTypeId } from '../targetTypeId';

export type PackageBTarget = BasePackage<{
  packageFile: ParseableOnDiskJsonFileTarget<ObjectTarget>;
  typeScriptConfigFile: ParseableOnDiskJsonFileTarget<ObjectTarget>;
  runTestsScript: OnDiskUtf8FileTarget;
  testFileMetadataSet: CategorizedTestFileMetadataTarget<{
    fileType: SupportedTestFileType;
  }>[];
}>;

export type PackageBTypedTarget = TypedTarget<
  TargetTypeId.PackageB,
  PackageBTarget
>;
