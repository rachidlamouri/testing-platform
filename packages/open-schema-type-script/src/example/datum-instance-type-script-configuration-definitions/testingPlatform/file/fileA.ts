import fs from 'fs';
import { posix } from 'path';
import { UnknownCollectionLocator } from '../../../../core/collectionLocator';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import {
  File,
  FileSemanticsIdentifier,
  fileSemanticsByExtension,
  FileExtensionSemanticsIdentifier,
} from './file';

export type FileA = File;

export type FileATypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [
      FileSemanticsIdentifier.A,
      FileExtensionSemanticsIdentifier,
    ];
    datumInstanceIdentifier: UnknownCollectionLocator;
    datumInstance: FileA;
    // TODO: consider not using the semantics identifier since that could be confusing; and we don't want people to look up the semantics from an alias; they are indirectly related
    datumInstanceAliases: [FileSemanticsIdentifier];
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
      const fileSemanticsIdentifier =
        fileSemanticsByExtension[extension] ?? FileSemanticsIdentifier.Unknown;

      return {
        instanceIdentifier: filePath,
        datumInstance: {
          filePath,
          fileSemanticsIdentifier,
        },
        predicateIdentifiers: [
          FileSemanticsIdentifier.A,
          fileSemanticsIdentifier,
        ],
        aliases: [fileSemanticsIdentifier],
      };
    },
  );

  return outputConfigurationTuple;
};
