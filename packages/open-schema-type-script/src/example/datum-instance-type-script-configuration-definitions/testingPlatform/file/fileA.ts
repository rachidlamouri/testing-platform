import fs from 'fs';
import { posix } from 'path';
import { UnknownCollectionLocator } from '../../../../core/collectionLocator';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
  RootDatumInstanceTypeScriptConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { TypeScriptSemanticsIdentifier } from '../typeScriptSemanticsIdentifier';

enum FileTypeIdentifier {
  JSON = 'JSON',
  TypeScript = 'TypeScript',
  Unknown = 'Unknown',
}

const extensionsByFileType = {
  [FileTypeIdentifier.JSON]: '.json',
  [FileTypeIdentifier.TypeScript]: '.ts',
  [FileTypeIdentifier.Unknown]: '.:shrug:',
} satisfies Record<FileTypeIdentifier, string>;

// TODO: make a util for swapping keys and values
const fileTypesByExtension = Object.fromEntries(
  Object.entries(extensionsByFileType).map(([k, v]) => [v, k]),
) as Record<string, FileTypeIdentifier>;

export type FileA = {
  filePath: string;
  fileTypeIdentifier: FileTypeIdentifier;
};

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
  InputCollection: [RootDatumInstanceTypeScriptConfiguration];
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
