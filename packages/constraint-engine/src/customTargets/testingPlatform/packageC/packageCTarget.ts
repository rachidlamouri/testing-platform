import { TypedTarget } from '../../../types/typedTarget';
import { ParseableOnDiskJsonFileTarget } from '../../file/jsonFile/jsonFileTarget';
import { OnDiskUtf8FileTarget } from '../../file/utf8File/utf8FileTarget';
import { ObjectTarget } from '../../type-script/objectTarget';
import { BasePackage } from '../basePackage';
import {
  CategorizedTestFileMetadata,
  SupportedTestFileType,
} from '../categorizedTestFileMetadata';
import { TargetTypeId } from '../targetTypeId';
import { PackageConfigurationTarget } from './packageConfigurationTarget';

export type PackageCPackageFileContentsTarget = {
  testingPlatformConfiguration: PackageConfigurationTarget;
  [key: string]: unknown;
};

export type PackageCPackageFileTarget =
  ParseableOnDiskJsonFileTarget<PackageCPackageFileContentsTarget>;

export type PackageCTarget = BasePackage<{
  packageFile: PackageCPackageFileTarget;
  typeScriptConfigFile: ParseableOnDiskJsonFileTarget<ObjectTarget>;
  runTestsScript: OnDiskUtf8FileTarget;
  testFileMetadataSet: CategorizedTestFileMetadata<{
    fileType: SupportedTestFileType;
  }>[];
}>;

export type PackageCTypedTarget = TypedTarget<
  TargetTypeId.PackageC,
  PackageCTarget
>;
