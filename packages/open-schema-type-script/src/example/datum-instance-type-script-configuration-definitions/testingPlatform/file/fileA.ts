import fs from 'fs';
import { posix } from 'path';
import { UnknownCollectionLocator } from '../../../../core/collectionLocator';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { TypeScriptSemanticsIdentifier } from '../typeScriptSemanticsIdentifier';
import { File, FileTypeIdentifier, fileTypesByExtension } from './file';

export type FileA = File;

export type FileATypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifier: TypeScriptSemanticsIdentifier.FileA;
    datumInstanceIdentifier: UnknownCollectionLocator;
    datumInstance: FileA;
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

      return {
        instanceIdentifier: filePath,
        datumInstance: {
          filePath,
          fileTypeIdentifier:
            fileTypesByExtension[extension] ?? FileTypeIdentifier.Unknown,
        },
        predicateIdentifiers: [TypeScriptSemanticsIdentifier.FileA],
      };
    },
  );

  return outputConfigurationTuple;
};
