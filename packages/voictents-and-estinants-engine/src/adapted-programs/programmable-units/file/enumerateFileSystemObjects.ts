import {
  FileSystemNodeMetadata,
  getNestedFileSystemNodeMetadataList,
} from '../../../package-agnostic-utilities/file/getNestedFileSystemNodeMetadataList';
import { splitList } from '../../../package-agnostic-utilities/array/splitList';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { DIRECTORY_GEPP, DirectoryInstance, DirectoryVoque } from './directory';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  FileSystemObjectEnumeratorConfigurationVoque,
} from './fileSystemObjectEnumeratorConfiguration';
import { getTextDigest } from '../../../package-agnostic-utilities/string/getTextDigest';
import { FILE_GEPP, File, FileInstance, FileVoque } from './file';

/**
 * Traverses the file system starting from a given directory path, and outputs
 * all of the encountered directories and files. It ignores file system nodes
 * based on the input configuration's ignored list configuration.
 */
export const enumerateFileSystemObjects = buildProgrammedTransform({
  name: 'enumerateFileSystemObjects',
})
  .fromItem2<FileSystemObjectEnumeratorConfigurationVoque>({
    collectionId: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  })
  .toItemTuple2<DirectoryVoque>({
    collectionId: DIRECTORY_GEPP,
  })
  .toItemTuple2<FileVoque>({
    collectionId: FILE_GEPP,
  })
  .onTransform((input) => {
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
      const file2 = new FileInstance({
        instanceId: getTextDigest(nodePath),
        nodePath,
      });

      return file2;
    });

    // Reorders the files by suffix identifier so they are easier to see in a serialized collection
    const reorderByFileSuffixForDebugability = <TFile extends File>(
      fileList: TFile[],
    ): TFile[] => {
      const fileBySuffixIdentifier = new Map<string, TFile[]>();
      fileList.forEach((file) => {
        const { suffixIdentifier } = file.nodePath.name.extension;

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
