import fs from 'fs';
import { posix } from 'path';
import { UnknownCollectionLocatorPart } from '../../../../core/collectionLocator';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { File, fileExtensionSemanticsIdentifiersByExtension } from './file';
import { FileExtensionSemanticsIdentifier } from './fileExtensionSemanticsIdentifier';
import { FileTypeScriptSemanticsIdentifier } from './fileTypeScriptSemanticsIdentifier';

export type FileA = File;

export type FileADatumInstanceIdentifier =
  `${FileTypeScriptSemanticsIdentifier.FileA}:${UnknownCollectionLocatorPart}`;

export type FileADatumInstanceAlias =
  `${FileExtensionSemanticsIdentifier}:${FileTypeScriptSemanticsIdentifier.FileA}`;

export type FileATypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [FileTypeScriptSemanticsIdentifier.FileA];
    datumInstanceIdentifier: FileADatumInstanceIdentifier;
    datumInstance: FileA;
    // TODO: consider not using the semantics identifier since that could be confusing; and we don't want people to look up the semantics from an alias; they are indirectly related
    datumInstanceAliases: [FileADatumInstanceAlias];
  }>;

const accumulateFilePaths = (
  directoryPath: string,
  ignoredPaths: Set<string>,
  mutableFilePathList: string[],
  iterationCount: number,
): void => {
  // if (iterationCount === 3) {
  //   return;
  // }

  const statuses = fs
    .readdirSync(directoryPath)
    .map((nodeName) => posix.join(directoryPath, nodeName))
    .filter((nodePath) => !ignoredPaths.has(nodePath))
    .map((nodePath) => {
      const status = fs.statSync(nodePath);
      return {
        nodePath,
        isDirectory: status.isDirectory(),
      };
    });

  statuses.forEach((status) => {
    if (status.isDirectory) {
      accumulateFilePaths(
        status.nodePath,
        ignoredPaths,
        mutableFilePathList,
        iterationCount + 1,
      );
    } else {
      mutableFilePathList.push(status.nodePath);
    }
  });
};

export const buildFileATuple: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [];
  OutputCollection: FileATypeScriptConfiguration[];
}> = () => {
  const mutableFilePathList: string[] = [];
  accumulateFilePaths(
    '.',
    new Set(['.git', 'debug', 'node_modules']),
    mutableFilePathList,
    0,
  );

  const outputConfigurationTuple = mutableFilePathList.map(
    (
      filePath,
    ): DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<FileATypeScriptConfiguration> => {
      const extension = posix.extname(filePath);

      // TODO: encapsulate this default behavior in a function
      const fileExtensionSemanticsIdentifier =
        fileExtensionSemanticsIdentifiersByExtension[extension] ??
        FileExtensionSemanticsIdentifier.Unknown;

      const alias: FileADatumInstanceAlias = `${fileExtensionSemanticsIdentifier}:${FileTypeScriptSemanticsIdentifier.FileA}`;

      return {
        instanceIdentifier: `${FileTypeScriptSemanticsIdentifier.FileA}:${filePath}`,
        datumInstance: {
          filePath,
          fileExtensionSemanticsIdentifier,
        },
        predicateIdentifiers: [FileTypeScriptSemanticsIdentifier.FileA],
        aliases: [alias],
      };
    },
  );

  return outputConfigurationTuple;
};
