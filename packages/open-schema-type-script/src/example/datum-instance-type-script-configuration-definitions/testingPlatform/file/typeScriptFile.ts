import { UnknownCollectionLocator } from '../../../../core/collectionLocator';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { File, FileSemanticsIdentifier } from './file';
import { FileATypeScriptConfiguration } from './fileA';

export type TypeScriptFile = File<FileSemanticsIdentifier.TypeScript>;

export type TypeScriptFileTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifier: FileSemanticsIdentifier.A;
    datumInstanceIdentifier: UnknownCollectionLocator;
    datumInstance: TypeScriptFile;
  }>;

// TODO: use semantics to drive this kind of conditional transformation
export const buildTypeScriptFile: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [FileATypeScriptConfiguration];
  OutputCollection: TypeScriptFileTypeScriptConfiguration[];
}> = (inputConfiguration) => {
  if (
    inputConfiguration.datumInstance.fileSemanticsIdentifier ===
    FileSemanticsIdentifier.TypeScript
  ) {
    return [
      inputConfiguration as DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<TypeScriptFileTypeScriptConfiguration>,
    ];
  }

  return [];
};
