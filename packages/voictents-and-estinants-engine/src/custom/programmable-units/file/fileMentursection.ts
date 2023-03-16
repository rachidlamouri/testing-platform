import { buildMentursection } from '../../../type-script-adapter/estinant/mentursection';
import {
  FileSystemNodeMetadata,
  getNestedFileSystemNodeMetadataList,
} from '../../../utilities/file/getNestedFilePaths';
import { splitList } from '../../../utilities/splitList';
import {
  DirectoryOdeshin,
  DirectoryVoictent,
  DIRECTORY_GEPP,
} from './directory';
import { FileVoictent, FILE_GEPP, FileOdeshin, FileGrition } from './file';
import { getFileExtensionSuffixIdentifier } from './fileExtensionSuffixIdentifier';
import {
  FileMentursectionConfigurationVoictent,
  FILE_MENTURSECTION_CONFIGURATION_GEPP,
} from './fileMentursectionConfiguration';
import { getFileMetadata } from './getFileMetadata';

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

const partsToScreamingSnake = (x: string[]): string => {
  return x
    .map((word) => {
      return word.toUpperCase();
    })
    .join('_');
};

const partsToKebabCase = (x: string[]): string => {
  return x.join('-');
};

export const fileMentursection = buildMentursection<
  FileMentursectionConfigurationVoictent,
  [DirectoryVoictent, FileVoictent]
>({
  inputGepp: FILE_MENTURSECTION_CONFIGURATION_GEPP,
  outputGeppTuple: [DIRECTORY_GEPP, FILE_GEPP],
  pinbe: (input) => {
    const nodeMetadataList = getNestedFileSystemNodeMetadataList(input);

    const directoryMetadataList: FileSystemNodeMetadata[] = [];
    const fileMetadataList: FileSystemNodeMetadata[] = [];
    splitList({
      list: nodeMetadataList,
      isElementA: (
        element,
      ): element is FileSystemNodeMetadata & { isDirectory: true } => {
        return element.isDirectory;
      },
      accumulatorA: directoryMetadataList,
      accumulatorB: fileMetadataList,
    });

    const directoryOutputTuple = directoryMetadataList.map<DirectoryOdeshin>(
      ({ nodePath }) => {
        return {
          zorn: nodePath,
          grition: {
            directoryPath: nodePath,
            directoryPathPartList: nodePath.split('/'),
          },
        };
      },
    );

    const fileOutputTuple = fileMetadataList.map<FileOdeshin>(
      ({ nodePath, directoryPath }) => {
        const {
          onDiskFileNameParts,
          inMemoryFileNameParts,
          extensionSuffix,
          extensionParts,
        } = getFileMetadata(nodePath);

        const grition: FileGrition = {
          filePath: nodePath,
          directoryPath,
          onDiskFileName: {
            camelCase: partsToCamel(onDiskFileNameParts),
            pascalCase: partsToPascal(onDiskFileNameParts),
            screamingSnakeCase: partsToScreamingSnake(onDiskFileNameParts),
            kebabCase: partsToKebabCase(onDiskFileNameParts),
          },
          inMemoryFileName: {
            camelCase: partsToCamel(inMemoryFileNameParts),
            pascalCase: partsToPascal(inMemoryFileNameParts),
            screamingSnakeCase: partsToScreamingSnake(inMemoryFileNameParts),
            kebabCase: partsToKebabCase(inMemoryFileNameParts),
          },
          extension: {
            parts: extensionParts,
            suffix: extensionSuffix,
            suffixIdentifier: getFileExtensionSuffixIdentifier(extensionSuffix),
          },
          additionalMetadata: null,
        };

        return {
          zorn: nodePath,
          grition,
        };
      },
    );

    return {
      [DIRECTORY_GEPP]: directoryOutputTuple,
      [FILE_GEPP]: fileOutputTuple,
    };
  },
});