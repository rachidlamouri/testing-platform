import { TypedTarget } from '../../../types/typedTarget';
import { JsonFileTarget } from '../../file/jsonFile/jsonFileTarget';
import { Utf8FileTarget } from '../../file/utf8File/utf8FileTarget';
import { BasePackage } from '../basePackage';
import {
  CategorizedTestFileMetadata,
  SupportedTestFileType,
} from '../categorizedTestFileMetadata';
import { TargetTypeId } from '../targetTypeId';

export type PackageATarget = BasePackage<{
  packageFile: JsonFileTarget;
  typeScriptConfigFile: JsonFileTarget;
  runTestsScript: Utf8FileTarget;
  testFileMetadataSet: CategorizedTestFileMetadata<{
    fileType: SupportedTestFileType | null;
  }>[];
}>;

export type PackageATypedTarget = TypedTarget<
  TargetTypeId.PackageA,
  PackageATarget
>;
