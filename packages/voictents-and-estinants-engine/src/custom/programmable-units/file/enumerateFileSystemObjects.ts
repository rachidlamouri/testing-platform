import * as uuid from 'uuid';
import {
  FileSystemNodeMetadata,
  getNestedFileSystemNodeMetadataList,
} from '../../../utilities/file/getNestedFilePaths';
import { splitList } from '../../../utilities/splitList';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  DirectoryOdeshin,
  DirectoryVoictent,
  DIRECTORY_GEPP,
} from './directory';
import { FileVoictent, FILE_GEPP, FileOdeshin, FileGrition } from './file';
import { getFileExtensionSuffixIdentifier } from './fileExtensionSuffixIdentifier';
import {
  FileSystemObjectEnumeratorConfigurationVoictent,
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
} from './fileSystemObjectEnumeratorConfiguration';
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

export const enumerateFileSystemObjects = buildEstinant()
  .fromHubblepup<FileSystemObjectEnumeratorConfigurationVoictent>({
    gepp: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  })
  .toHubblepupTuple<DirectoryVoictent>({
    gepp: DIRECTORY_GEPP,
  })
  .toHubblepupTuple<FileVoictent>({
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

    const directoryOutputTuple = directoryMetadataList.map<DirectoryOdeshin>(
      ({ nodePath }) => {
        return {
          zorn: nodePath,
          grition: {
            instanceId: uuid.v4(),
            directoryPath: nodePath,
            directoryPathPartList: nodePath.split('/'),
          },
        };
      },
    );

    const fileTuple = fileMetadataList.map<FileOdeshin>(
      ({ nodePath, directoryPath }) => {
        const {
          onDiskFileNameParts,
          inMemoryFileNameParts,
          extensionSuffix,
          extensionParts,
        } = getFileMetadata(nodePath);

        const grition: FileGrition = {
          instanceId: uuid.v4(),
          filePath: nodePath,
          directoryPath,
          onDiskFileName: {
            camelCase: partsToCamel(onDiskFileNameParts),
            pascalCase: partsToPascal(onDiskFileNameParts),
            screamingSnakeCase: partsToScreamingSnake(onDiskFileNameParts),
            kebabCase: partsToKebabCase(onDiskFileNameParts),
            parts: onDiskFileNameParts,
          },
          inMemoryFileName: {
            camelCase: partsToCamel(inMemoryFileNameParts),
            pascalCase: partsToPascal(inMemoryFileNameParts),
            screamingSnakeCase: partsToScreamingSnake(inMemoryFileNameParts),
            kebabCase: partsToKebabCase(inMemoryFileNameParts),
            parts: inMemoryFileNameParts,
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

    const fileByGroupId = new Map<string, FileOdeshin[]>();
    fileTuple.forEach((fileOdeshin) => {
      const groupId = fileOdeshin.grition.extension.suffixIdentifier;

      const list = fileByGroupId.get(groupId) ?? [];
      list.push(fileOdeshin);
      fileByGroupId.set(groupId, list);
    });

    const outputFileTuple = [...fileByGroupId.values()].flat();

    return {
      [DIRECTORY_GEPP]: directoryOutputTuple,
      [FILE_GEPP]: outputFileTuple,
    };
  })
  .assemble();
