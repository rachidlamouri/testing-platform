// DatumInstanceTypeScriptConfiguration

import fs from 'fs';
import { posix } from 'path';
import { UnknownCollectionLocatorPart } from '../../../../core/collectionLocator';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { File, getFileExtensionSuffixSemanticsIdentifier } from './file';
import { FileExtensionSuffixSemanticsIdentifier } from './fileExtensionSuffixSemanticsIdentifier';
import { FileTypeScriptSemanticsIdentifier } from './fileTypeScriptSemanticsIdentifier';

export type FileA = File;

export type FileADatumInstanceIdentifier =
  `${FileTypeScriptSemanticsIdentifier.FileA}:${UnknownCollectionLocatorPart}`;

export type FileADatumInstanceAlias =
  `${FileExtensionSuffixSemanticsIdentifier}:${FileTypeScriptSemanticsIdentifier.FileA}`;

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

const getCamelCaseNameParts = (camelCaseName: string): string[] => {
  const letters = camelCaseName.split('');

  const segmentIndicies: number[] = [0];
  letters.forEach((letter, index) => {
    const isUpperCase = letter === letter.toUpperCase();
    if (isUpperCase) {
      segmentIndicies.push(index);
    }
  });
  segmentIndicies.push(letters.length);

  const thingyPairs = segmentIndicies
    .slice(0, segmentIndicies.length - 1)
    .map((someIndex, someIndiciesIndex): [number, number] => {
      return [someIndex, segmentIndicies[someIndiciesIndex + 1]];
    });

  const stuff = thingyPairs.map(([start, end]) =>
    letters.slice(start, end).join(''),
  );

  const normalizedStuff = stuff.map((x) => x.toLowerCase());

  return normalizedStuff;
};

const partsToCamel = (x: string[]): string => {
  return x
    .map((word, index) => {
      if (index === 0) {
        return word;
      }

      return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
    })
    .join('');
};

const partsToPascal = (x: string[]): string => {
  return x
    .map((word) => {
      return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
    })
    .join('');
};

type FileStuff = {
  filePath: string;
  parentDirectoryNameParts: string[];
  onDiskFileNameParts: string[];
  inMemoryFileNameParts: string[];
  extensionParts: string[];
  extensionSuffix: string;
};

// TODO: update this so we don't have to assume that files are in camel case and directories are in kebab case
const getFileStuff = (filePath: string): FileStuff => {
  const { dir: parentDirectoryNodePath, base: legalFileName } =
    posix.parse(filePath);

  const parentDirectoryPathParts = parentDirectoryNodePath.split('/');
  const parentDirectoryName =
    parentDirectoryPathParts[parentDirectoryPathParts.length - 1];
  const parentDirectoryNameParts = parentDirectoryName
    .split('-')
    .map((x) => x.toLowerCase());

  const [onDiskFileName, ...fileExtensionParts] = legalFileName.split('.');
  const normalizedFileExtensionParts = fileExtensionParts.map((x) =>
    x.toLowerCase(),
  );
  const fileExtensionSuffix: string =
    fileExtensionParts[fileExtensionParts.length - 1];

  const onDiskFileNameParts = getCamelCaseNameParts(onDiskFileName);

  const isIndexFile = onDiskFileName === 'index';
  const inMemoryFileNameParts = isIndexFile
    ? parentDirectoryNameParts
    : onDiskFileNameParts;

  return {
    filePath,
    parentDirectoryNameParts,
    onDiskFileNameParts,
    inMemoryFileNameParts,
    extensionParts: normalizedFileExtensionParts,
    extensionSuffix: fileExtensionSuffix,
  } satisfies FileStuff;
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
      const fileStuff = getFileStuff(filePath);

      const fileExtensionSemanticsIdentifier =
        getFileExtensionSuffixSemanticsIdentifier(fileStuff.extensionSuffix);

      const alias: FileADatumInstanceAlias = `${fileExtensionSemanticsIdentifier}:${FileTypeScriptSemanticsIdentifier.FileA}`;

      return {
        instanceIdentifier: `${FileTypeScriptSemanticsIdentifier.FileA}:${filePath}`,
        datumInstance: {
          filePath,
          onDiskFileName: {
            camelCase: partsToCamel(fileStuff.onDiskFileNameParts),
            pascalCase: partsToPascal(fileStuff.onDiskFileNameParts),
          },
          inMemoryFileName: {
            camelCase: partsToCamel(fileStuff.inMemoryFileNameParts),
            pascalCase: partsToPascal(fileStuff.inMemoryFileNameParts),
          },
          extension: {
            parts: fileStuff.extensionParts,
            suffix: fileStuff.extensionSuffix,
            suffixSemanticsIdentifier: fileExtensionSemanticsIdentifier,
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
