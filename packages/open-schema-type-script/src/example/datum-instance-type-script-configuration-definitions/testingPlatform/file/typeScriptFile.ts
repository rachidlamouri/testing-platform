import { UnknownCollectionLocator } from '../../../../core/collectionLocator';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { TypeScriptSemanticsIdentifier } from '../typeScriptSemanticsIdentifier';
import { File, FileTypeIdentifier } from './file';
import { FileATypeScriptConfiguration } from './fileA';

export type TypeScriptFile = File<FileTypeIdentifier.TypeScript>;

export type TypeScriptFileTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifier: TypeScriptSemanticsIdentifier.FileA;
    datumInstanceIdentifier: UnknownCollectionLocator;
    datumInstance: TypeScriptFile;
  }>;

// TODO: use semantics to drive this kind of conditional transformation
export const buildTypeScriptFile: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [FileATypeScriptConfiguration];
  OutputCollection: TypeScriptFileTypeScriptConfiguration[];
}> = (inputConfiguration) => {
  if (
    inputConfiguration.datumInstance.fileTypeIdentifier ===
    FileTypeIdentifier.TypeScript
  ) {
    return [
      inputConfiguration as DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<TypeScriptFileTypeScriptConfiguration>,
    ];
  }

  return [];
};
