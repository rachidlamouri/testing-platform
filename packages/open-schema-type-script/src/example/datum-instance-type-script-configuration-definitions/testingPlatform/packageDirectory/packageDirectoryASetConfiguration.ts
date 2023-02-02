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

export type PackageDirectoryASetConfigurationDatumInstanceIdentifier =
  'package-directory-name-set-configuration';

export type PackageDirectoryASetConfigurationTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [
      TypeScriptSemanticsIdentifier.PackageDirectoryNameSetConfiguration,
    ];
    datumInstanceIdentifier: PackageDirectoryASetConfigurationDatumInstanceIdentifier;
    datumInstance: PackageDirectoryASetConfiguration;
    datumInstanceAliases: [];
  }>;

// TODO: make the file comment configurable to mark which types are not needed
export type PackageDirectoryASetConfigurationDatumInstanceAlias = symbol;

export const PACKAGE_DIRECTORY_NAME_SET_CONFIGURATION_TYPE_SCRIPT_CONFIGURATION: PackageDirectoryASetConfigurationTypeScriptConfiguration =
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

export const buildPackageDirectoryASetConfiguration: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [];
  OutputCollection: [PackageDirectoryASetConfigurationTypeScriptConfiguration];
}> = () => {
  return [
    getDatumInstanceConfiguration(
      PACKAGE_DIRECTORY_NAME_SET_CONFIGURATION_TYPE_SCRIPT_CONFIGURATION,
    ),
  ];
};
