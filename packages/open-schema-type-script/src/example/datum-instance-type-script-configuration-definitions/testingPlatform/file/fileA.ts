import fs from 'fs';
import { posix } from 'path';
import { UnknownCollectionLocatorPart } from '../../../../core/collectionLocator';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { File, fileExtensionSemanticsIdentifiersByExtension } from './file';
import { FileExtensionSemanticsIdentifier } from './fileExtensionSuffixSemanticsIdentifier';
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

type ComparisonConfiguration = {
  name: 'Equals' | 'EndsWith';
  value: string;
};

const comparisonImplementationsByName: Record<
  ComparisonConfiguration['name'],
  (
    nodePath: string,
    comparisonConfiguration: ComparisonConfiguration,
  ) => boolean
> = {
  Equals: (nodePath, thing) => nodePath === thing.value,
  EndsWith: (nodePath, thing) => nodePath.endsWith(thing.value),
};

const accumulateFilePaths = (
  directoryPath: string,
  configurationsForIgnoring: ComparisonConfiguration[],
  mutableFilePathList: string[],
  iterationCount: number,
): void => {
  // if (iterationCount === 3) {
  //   return;
  // }

  const statuses = fs
    .readdirSync(directoryPath)
    .map((nodeName) => posix.join(directoryPath, nodeName))
    .filter((nodePath) => {
      const isIgnored = configurationsForIgnoring.some(
        (comparisonConfiguration) => {
          const performComparison =
            comparisonImplementationsByName[comparisonConfiguration.name];
          return performComparison(nodePath, comparisonConfiguration);
        },
      );

      return !isIgnored;
    })
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
        configurationsForIgnoring,
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
    [
      {
        name: 'Equals',
        value: '.git',
      },
      {
        name: 'Equals',
        value: 'debug',
      },
      {
        name: 'EndsWith',
        value: 'node_modules',
      },
    ],
    mutableFilePathList,
    0,
  );

  const outputConfigurationTuple = mutableFilePathList.map(
    (
      filePath,
    ): DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<FileATypeScriptConfiguration> => {
      const {
        ext: extension,
        // TODO: enable configuring this builder so we don't have to assume the file name is camel case
        name: camelCaseFileName,
      } = posix.parse(filePath);

      // TODO: encapsulate this default behavior in a function
      const fileExtensionSemanticsIdentifier =
        fileExtensionSemanticsIdentifiersByExtension[extension] ??
        FileExtensionSemanticsIdentifier.Unknown;

      const alias: FileADatumInstanceAlias = `${fileExtensionSemanticsIdentifier}:${FileTypeScriptSemanticsIdentifier.FileA}`;

      return {
        instanceIdentifier: `${FileTypeScriptSemanticsIdentifier.FileA}:${filePath}`,
        datumInstance: {
          filePath,
          fileName: {
            camelCase: camelCaseFileName,
            pascalCase: `${camelCaseFileName
              .slice(0, 1)
              .toUpperCase()}${camelCaseFileName.slice(1)}`,
          },
          extension: {
            value: extension,
            semanticsIdentifier: fileExtensionSemanticsIdentifier,
          },
          additionalMetadata: null,
        },
        predicateIdentifiers: [FileTypeScriptSemanticsIdentifier.FileA],
        aliases: [alias],
      };
    },
  );

  return outputConfigurationTuple;
};
