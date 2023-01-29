import { JsonFileTarget } from '../file/jsonFile/jsonFileTarget';
import { Utf8FileTarget } from '../file/utf8File/utf8FileTarget';
import {
  CategorizedTestFileMetadata,
  SupportedTestFileType,
} from './categorizedTestFileMetadata';

type ConfigurablePackageProperties = {
  packageFile: JsonFileTarget;
  runTestsScript: Utf8FileTarget;
  typeScriptConfigFile: JsonFileTarget;
  testFileMetadataSet: CategorizedTestFileMetadata<{
    fileType: SupportedTestFileType | null;
  }>[];
};

export type BasePackage<
  TPackageProperties extends ConfigurablePackageProperties,
> = {
  directoryName: string;
  packageFile: TPackageProperties['packageFile'];
  typeScriptConfigFile: TPackageProperties['typeScriptConfigFile'];
  runTestsScript: TPackageProperties['runTestsScript'];
  testFileMetadataSet: TPackageProperties['testFileMetadataSet'];
};
