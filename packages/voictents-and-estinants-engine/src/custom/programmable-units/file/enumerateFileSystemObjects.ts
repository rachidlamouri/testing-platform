import {
  FileSystemNodeMetadata,
  getNestedFileSystemNodeMetadataList,
} from '../../../utilities/file/getNestedFilePaths';
import { splitList } from '../../../utilities/splitList';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { DIRECTORY_GEPP, DirectoryInstance, DirectoryVoque } from './directory';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  FileSystemObjectEnumeratorConfigurationVoque,
} from './fileSystemObjectEnumeratorConfiguration';
import { getTextDigest } from '../../../utilities/getTextDigest';
import { FILE_GEPP, File, FileInstance, FileVoque } from './file';

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

    const directoryOutputTuple = directoryMetadataList.map(
      ({ nodePath, ancestorDirectoryPathSet }) => {
        return new DirectoryInstance({
          instanceId: getTextDigest(nodePath),
          nodePath,
          ancestorDirectoryPathSet,
        });
      },
    );

    const unorderedFileTuple = fileMetadataList.map<File>(
      ({ nodePath, ancestorDirectoryPathSet }) => {
        const file2 = new FileInstance({
          instanceId: getTextDigest(nodePath),
          nodePath,
          ancestorDirectoryPathSet,
          additionalMetadata: null,
        });

        return file2;
      },
    );

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
