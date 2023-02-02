// DatumInstanceTypeScriptConfiguration

import {
  DatumInstanceTypeScriptConfiguration,
  getDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { TypeScriptSemanticsIdentifier } from '../typeScriptSemanticsIdentifier';

export type PackageDirectoryASetConfiguration = {
  rootDirectoryRelativeToCurrentWorkingDirectory: string;
};

export type PackageDirectoryNameSetConfigurationTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [
      TypeScriptSemanticsIdentifier.PackageDirectoryNameSetConfiguration,
    ];
    datumInstanceIdentifier: 'package-directory-name-set-configuration';
    datumInstance: PackageDirectoryASetConfiguration;
    datumInstanceAliases: [];
  }>;

export const PACKAGE_DIRECTORY_NAME_SET_CONFIGURATION_TYPE_SCRIPT_CONFIGURATION: PackageDirectoryNameSetConfigurationTypeScriptConfiguration =
  {
    typeSemanticsIdentifiers: [
      TypeScriptSemanticsIdentifier.PackageDirectoryNameSetConfiguration,
    ],
    datumInstanceIdentifier: 'package-directory-name-set-configuration',
    datumInstance: {
      rootDirectoryRelativeToCurrentWorkingDirectory: 'packages',
    },
    datumInstanceAliases: [],
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
