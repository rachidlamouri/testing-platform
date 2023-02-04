// DatumInstanceTypeScriptConfiguration

import fs from 'fs';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { TypeScriptSemanticsIdentifier } from '../typeScriptSemanticsIdentifier';
import { PackageDirectoryASetConfigurationTypeScriptConfiguration } from './packageDirectoryASetConfiguration';

export type PackageDirectoryASet = {
  directoryPaths: string[];
};

export type PackageDirectoryASetDatumInstanceIdentifier =
  'package-directory-name-set';

export type PackageDirectoryASetTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [
      TypeScriptSemanticsIdentifier.PackageDirectoryNameSet,
    ];
    datumInstanceIdentifier: PackageDirectoryASetDatumInstanceIdentifier;
    datumInstance: PackageDirectoryASet;
    datumInstanceAliases: [];
  }>;

// TODO: allow ignoring this from the file comment
export type PackageDirectoryASetDatumInstanceAlias = symbol;

export const buildPackageDirectoryASet: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [PackageDirectoryASetConfigurationTypeScriptConfiguration];
  OutputCollection: [PackageDirectoryASetTypeScriptConfiguration];
}> = (packageDirectoryNameSetConfigurationConfiguration) => {
  const parentDirectoryPath =
    packageDirectoryNameSetConfigurationConfiguration.datumInstance
      .rootDirectoryRelativeToCurrentWorkingDirectory;
  const directoryPaths = fs.readdirSync(parentDirectoryPath);

  const packageDirectoryNameSetConfiguration: DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<PackageDirectoryASetTypeScriptConfiguration> =
    {
      predicateIdentifiers: [
        TypeScriptSemanticsIdentifier.PackageDirectoryNameSet,
      ],
      instanceIdentifier: 'package-directory-name-set',
      datumInstance: { directoryPaths },
      aliases: [],
    };

  return [packageDirectoryNameSetConfiguration];
};
