import {
  FileSystemNodeMetadata,
  getNestedFileSystemNodeMetadataList,
} from '../../../utilities/file/getNestedFilePaths';
import { splitList } from '../../../utilities/splitList';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { DIRECTORY_GEPP, DirectoryInstance, DirectoryVoque } from './directory';
import { getFileExtensionSuffixIdentifier } from './fileExtensionSuffixIdentifier';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  FileSystemObjectEnumeratorConfigurationVoque,
} from './fileSystemObjectEnumeratorConfiguration';
import { getFileMetadata } from './getFileMetadata';
import { getTextDigest } from '../../../utilities/getTextDigest';
import { FILE_GEPP, File, FileInstance, FileVoque } from './file';

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

    const directoryOutputTuple = directoryMetadataList.map(({ nodePath }) => {
      return new DirectoryInstance({
        instanceId: getTextDigest(nodePath),
        nodePath,
      });
    });

    const unorderedFileTuple = fileMetadataList.map<File>(({ nodePath }) => {
      const {
        onDiskFileName,
        onDiskFileNameParts,
        inMemoryFileNameParts,
        extensionSuffix,
        extensionParts,
      } = getFileMetadata(nodePath);

      const file2 = new FileInstance({
        instanceId: getTextDigest(nodePath),
        nodePath,
        onDiskFileName: {
          camelCase: partsToCamel(onDiskFileNameParts),
          pascalCase: partsToPascal(onDiskFileNameParts),
          screamingSnakeCase: partsToScreamingSnake(onDiskFileNameParts),
          kebabCase: partsToKebabCase(onDiskFileNameParts),
          asIs: onDiskFileName,
        },
        inMemoryFileName: {
          camelCase: partsToCamel(inMemoryFileNameParts),
          pascalCase: partsToPascal(inMemoryFileNameParts),
          screamingSnakeCase: partsToScreamingSnake(inMemoryFileNameParts),
          kebabCase: partsToKebabCase(inMemoryFileNameParts),
        },
        extension: {
          parts: extensionParts,
          partList: extensionParts,
          suffix: extensionSuffix,
          suffixIdentifier: getFileExtensionSuffixIdentifier(extensionSuffix),
        },
        additionalMetadata: null,
      });

      return file2;
    });

    // Reorders the files by suffix identifier so they are easier to see in a serialized collection
    const reorderByFileSuffixForDebugability = <TFile extends File>(
      fileList: TFile[],
    ): TFile[] => {
      const fileBySuffixIdentifier = new Map<string, TFile[]>();
      fileList.forEach((file) => {
        const { suffixIdentifier } = file.extension;

        const list = fileBySuffixIdentifier.get(suffixIdentifier) ?? [];
        list.push(file);
        fileBySuffixIdentifier.set(suffixIdentifier, list);
      });

      const result = [...fileBySuffixIdentifier.values()].flat();
      return result;
    };

    const orderedFileTuple =
      reorderByFileSuffixForDebugability(unorderedFileTuple);

    return {
      [DIRECTORY_GEPP]: directoryOutputTuple,
      [FILE_GEPP]: orderedFileTuple,
    };
  })
  .assemble();
