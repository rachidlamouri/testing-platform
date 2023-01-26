import fs from 'fs';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { TypeScriptSemanticsIdentifier } from '../typeScriptSemanticsIdentifier';
import { PackageDirectoryNameSetConfigurationTypeScriptConfiguration } from './packageDirectoryASetConfiguration';

export type PackageDirectoryNameSet = {
  directoryPaths: string[];
};

export type PackageDirectoryNameSetTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [
      TypeScriptSemanticsIdentifier.PackageDirectoryNameSet,
    ];
    datumInstanceIdentifier: 'package-directory-name-set';
    datumInstance: PackageDirectoryNameSet;
    datumInstanceAliases: [];
  }>;

export const buildPackageDirectoryNameSet: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [
    PackageDirectoryNameSetConfigurationTypeScriptConfiguration,
  ];
  OutputCollection: [PackageDirectoryNameSetTypeScriptConfiguration];
}> = (packageDirectoryNameSetConfigurationConfiguration) => {
  const parentDirectoryPath =
    packageDirectoryNameSetConfigurationConfiguration.datumInstance
      .rootDirectoryRelativeToCurrentWorkingDirectory;
  const directoryPaths = fs.readdirSync(parentDirectoryPath);

  const packageDirectoryNameSetConfiguration: DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<PackageDirectoryNameSetTypeScriptConfiguration> =
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
