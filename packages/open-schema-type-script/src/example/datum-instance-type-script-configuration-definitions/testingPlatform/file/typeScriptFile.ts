import { UnknownCollectionLocator } from '../../../../core/collectionLocator';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { Merge } from '../../../../utilities/types/merge/merge';
import { File, FileSemanticsIdentifier } from './file';
import { FileATypeScriptConfiguration } from './fileA';

export type TypeScriptFile = Merge<
  File<FileSemanticsIdentifier.TypeScript>,
  {
    ast: unknown;
  }
>;

export type TypeScriptFileTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [
      FileSemanticsIdentifier.TypeScript,
      FileSemanticsIdentifier.A,
    ];
    datumInstanceIdentifier: UnknownCollectionLocator;
    datumInstance: TypeScriptFile;
    datumInstanceAliases: [FileSemanticsIdentifier.TypeScript];
  }>;

export const buildTypeScriptFile: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [FileATypeScriptConfiguration];
  OutputCollection: [TypeScriptFileTypeScriptConfiguration];
}> = (inputFileConfiguration) => {
  const outputConfiguration: DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<TypeScriptFileTypeScriptConfiguration> =
    {
      instanceIdentifier: `TS:${inputFileConfiguration.datumInstance.filePath}`,
      datumInstance: {
        fileSemanticsIdentifier: FileSemanticsIdentifier.TypeScript,
        filePath: inputFileConfiguration.datumInstance.filePath,
        ast: null,
      },
      predicateIdentifiers: [
        FileSemanticsIdentifier.TypeScript,
        FileSemanticsIdentifier.A,
      ],
      // TODO: figure out how to tie this alias to the one from FileA, so you can just do inputFileConfiguration.aliases
      aliases: [FileSemanticsIdentifier.TypeScript],
    };

  return [outputConfiguration];
};
