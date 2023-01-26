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
      FileSemanticsIdentifier.A,
      FileSemanticsIdentifier.TypeScript,
    ];
    datumInstanceIdentifier: UnknownCollectionLocator;
    datumInstance: TypeScriptFile;
  }>;

export const buildTypeScriptFile: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [FileATypeScriptConfiguration];
  OutputCollection: [TypeScriptFileTypeScriptConfiguration];
}> = (inputFileConfiguration) => {
  const outputConfiguration: DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<TypeScriptFileTypeScriptConfiguration> =
    {
      instanceIdentifier: `${Math.random()}`,
      datumInstance: {
        fileSemanticsIdentifier: FileSemanticsIdentifier.TypeScript,
        filePath: inputFileConfiguration.datumInstance.filePath,
        ast: null,
      },
      predicateIdentifiers: [
        FileSemanticsIdentifier.A,
        FileSemanticsIdentifier.TypeScript,
      ],
    };

  return [outputConfiguration];
};
