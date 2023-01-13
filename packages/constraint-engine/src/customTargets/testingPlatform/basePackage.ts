import { JsonFileTarget } from '../file/jsonFile/jsonFileTarget';
import {
  Utf8FileMetadataTarget,
  Utf8FileTarget,
} from '../file/utf8File/utf8FileTarget';

type ConfigurablePackageProperties = {
  packageFile: JsonFileTarget;
  runTestsScript: Utf8FileTarget;
  typeScriptConfigFile: JsonFileTarget;
};

export type BasePackage<
  TPackageProperties extends ConfigurablePackageProperties,
> = {
  directoryName: string;
  packageFile: TPackageProperties['packageFile'];
  typeScriptConfigFile: TPackageProperties['typeScriptConfigFile'];
  runTestsScript: TPackageProperties['runTestsScript'];
  testFileMetadataSet: Utf8FileMetadataTarget[];
};
