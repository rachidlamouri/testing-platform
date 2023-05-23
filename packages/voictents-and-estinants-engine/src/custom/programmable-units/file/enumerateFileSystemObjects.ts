import {
  FileSystemNodeMetadata,
  getNestedFileSystemNodeMetadataList,
} from '../../../utilities/file/getNestedFilePaths';
import { splitList } from '../../../utilities/splitList';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { Directory, DIRECTORY_GEPP, DirectoryVoque } from './directory';
import { FILE_GEPP, File, FileVoque } from './file';
import { getFileExtensionSuffixIdentifier } from './fileExtensionSuffixIdentifier';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  FileSystemObjectEnumeratorConfigurationVoque,
} from './fileSystemObjectEnumeratorConfiguration';
import { getFileMetadata } from './getFileMetadata';
import { getTextDigest } from '../../../utilities/getTextDigest';

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

/**
 * Traverses the file system starting from a given directory path, and outputs
 * all of the encountered directories and files. It ignores file system nodes
 * based on the input configuration's ignored list configuration.
 */
export const enumerateFileSystemObjects = buildEstinant({
  name: 'enumerateFileSystemObjects',
})
  .fromHubblepup2<FileSystemObjectEnumeratorConfigurationVoque>({
    gepp: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  })
  .toHubblepupTuple2<DirectoryVoque>({
    gepp: DIRECTORY_GEPP,
  })
  .toHubblepupTuple2<FileVoque>({
    gepp: FILE_GEPP,
  })
  .onPinbe((input) => {
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

    const directoryOutputTuple = directoryMetadataList.map<Directory>(
      ({ nodePath }) => {
        const directoryPathPartList = nodePath.split('/');
        const directoryName =
          directoryPathPartList[directoryPathPartList.length - 1];

        return {
          zorn: nodePath,
          instanceId: getTextDigest(nodePath),
          directoryName,
          directoryPath: nodePath,
          directoryPathPartList,
        };
      },
    );

    const fileTuple = fileMetadataList.map<File>(
      ({ nodePath, directoryPath }) => {
        const {
          onDiskFileNameParts,
          inMemoryFileNameParts,
          extensionSuffix,
          extensionParts,
        } = getFileMetadata(nodePath);

        const file: File = {
          zorn: nodePath,
          instanceId: getTextDigest(nodePath),
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

        return file;
      },
    );

    const fileBySuffixIdentifier = new Map<string, File[]>();
    fileTuple.forEach((file) => {
      const { suffixIdentifier } = file.extension;

      const list = fileBySuffixIdentifier.get(suffixIdentifier) ?? [];
      list.push(file);
      fileBySuffixIdentifier.set(suffixIdentifier, list);
    });

    const outputFileTuple = [...fileBySuffixIdentifier.values()].flat();

    return {
      [DIRECTORY_GEPP]: directoryOutputTuple,
      [FILE_GEPP]: outputFileTuple,
    };
  })
  .assemble();
