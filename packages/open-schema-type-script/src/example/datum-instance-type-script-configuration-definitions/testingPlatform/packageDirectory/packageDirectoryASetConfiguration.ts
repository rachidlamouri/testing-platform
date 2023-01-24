import {
  DatumInstanceTypeScriptConfiguration,
  getDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { TypeScriptSemanticsIdentifier } from '../typeScriptSemanticsIdentifier';

export type PackageDirectoryNameSetConfiguration = {
  rootDirectoryRelativeToCurrentWorkingDirectory: string;
};

export type PackageDirectoryNameSetConfigurationTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifier: TypeScriptSemanticsIdentifier.PackageDirectoryNameSetConfiguration;
    datumInstanceIdentifier: 'package-directory-name-set-configuration';
    datumInstance: PackageDirectoryNameSetConfiguration;
  }>;

export const PACKAGE_DIRECTORY_NAME_SET_CONFIGURATION_TYPE_SCRIPT_CONFIGURATION: PackageDirectoryNameSetConfigurationTypeScriptConfiguration =
  {
    typeSemanticsIdentifier:
      TypeScriptSemanticsIdentifier.PackageDirectoryNameSetConfiguration,
    datumInstanceIdentifier: 'package-directory-name-set-configuration',
    datumInstance: {
      rootDirectoryRelativeToCurrentWorkingDirectory: 'packages',
    },
  };

export const buildPackageDirectoryNameSetConfiguration: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [];
  OutputCollection: [
    PackageDirectoryNameSetConfigurationTypeScriptConfiguration,
  ];
}> = () => {
  return [
    getDatumInstanceConfiguration(
      PACKAGE_DIRECTORY_NAME_SET_CONFIGURATION_TYPE_SCRIPT_CONFIGURATION,
    ),
  ];
};
