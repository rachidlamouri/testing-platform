import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  PARTITIONED_FILE_GEPP,
  PartitionedFileInstance,
  PartitionedFileVoque,
} from './file/partitionedFile';
import {
  PARTITION_FACT_GEPP,
  PartitionFactVoque,
} from './partition-fact/partitionFact';
import {
  FILE_DEPENDENCY_GEPP,
  FileDependencyVoque,
} from './dependency/fileDependency';
import { assertNotUndefined } from '../../../package-agnostic-utilities/nil/assertNotUndefined';
import {
  PARTITIONED_DIRECTORY_GEPP,
  PartitionedDirectoryInstance,
  PartitionedDirectoryVoque,
} from './directory/partitionedDirectory';
import {
  BOUNDED_DIRECTORY_GEPP,
  BoundedDirectoryVoque,
} from './directory/boundedDirectory';
import { BOUNDED_FILE_GEPP, BoundedFileVoque } from './file/boundedFile';

/**
 * Uses file dependencies to associate partitions to bounded files and bounded
 * directories. A file dependency consists of an importing file, and an imported
 * file. These files either exist in the same or two different partitions. Each
 * bounded file has a list of ancestor directories (up to the common boundary
 * root directory). Therefore each file in a file dependency, and all of their
 * respective ancestor directories, can be associated with the set of partitions
 * from the file dependency.
 */
export const getPartitionedFileSystemNodes = buildProgrammedTransform({
  name: 'getPartitionedFileSystemNodes',
})
  .fromCollection2<PartitionFactVoque>({
    collectionId: PARTITION_FACT_GEPP,
  })
  .andFromCollection2<BoundedDirectoryVoque>({
    collectionId: BOUNDED_DIRECTORY_GEPP,
  })
  .andFromCollection2<BoundedFileVoque>({
    collectionId: BOUNDED_FILE_GEPP,
  })
  .andFromCollection2<FileDependencyVoque>({
    collectionId: FILE_DEPENDENCY_GEPP,
  })
  .toItemTuple2<PartitionedDirectoryVoque>({
    collectionId: PARTITIONED_DIRECTORY_GEPP,
  })
  .toItemTuple2<PartitionedFileVoque>({
    collectionId: PARTITIONED_FILE_GEPP,
  })
  .onTransform(
    (
      partitionFactVoictent,
      directoryVoictent,
      fileVoictent,
      fileDependencyVoictent,
    ) => {
      type LocalFileSystemNodeMetadata = {
        isDirectory: boolean;
        nodePath: string;
        partitionFactZornSet: Set<string>;
      };

      const localMetadataByNodePath = new Map<
        string,
        LocalFileSystemNodeMetadata
      >(
        [
          ...directoryVoictent.list.map((directory) => {
            return {
              isDirectory: true,
              fileSystemNode: directory,
            };
          }),
          ...fileVoictent.list.map((file) => {
            return {
              isDirectory: false,
              fileSystemNode: file,
            };
          }),
        ].map(({ isDirectory, fileSystemNode }) => {
          const nodePath = fileSystemNode.nodePath.serialized;

          return [
            nodePath,
            {
              isDirectory,
              nodePath,
              partitionFactZornSet: new Set<string>(),
            },
          ];
        }),
      );

      fileDependencyVoictent.list
        .map(({ importingFile, importedFile }) => {
          const nodePathSet = new Set([
            importingFile.nodePath.serialized,
            ...importingFile.directoryPathSetFromBoundary,
            importedFile.nodePath.serialized,
            ...importedFile.directoryPathSetFromBoundary,
          ]);

          const partitionFactZornSet = new Set([
            importingFile.sourcePartitionFact.id.forHuman,
            importedFile.sourcePartitionFact.id.forHuman,
          ]);

          return {
            nodePathSet,
            partitionFactZornSet,
          };
        })
        .flatMap(({ nodePathSet, partitionFactZornSet }) => {
          return [...nodePathSet].flatMap((nodePath) => {
            return [...partitionFactZornSet].map((partitionFactZorn) => {
              return {
                nodePath,
                partitionFactZorn,
              };
            });
          });
        })
        .forEach(({ nodePath, partitionFactZorn }) => {
          const localMetadata = localMetadataByNodePath.get(nodePath);
          assertNotUndefined(localMetadata);

          localMetadata.partitionFactZornSet.add(partitionFactZorn);
        });

      const allMetadataList = [...localMetadataByNodePath.values()];

      const directoryMetadataList = allMetadataList.filter(
        (metadata) => metadata.isDirectory,
      );

      const fileMetadataList = allMetadataList.filter(
        (metadata) => !metadata.isDirectory,
      );

      const partitionedDirectoryList = directoryMetadataList
        .flatMap(({ nodePath, partitionFactZornSet }) => {
          const directory = directoryVoictent.byNodePath.get(nodePath);
          assertNotUndefined(directory);

          return [...partitionFactZornSet].map((partitionFactZorn) => {
            return {
              directory,
              partitionFactZorn,
            };
          });
        })
        .map(({ directory, partitionFactZorn }) => {
          const partitionFact =
            partitionFactVoictent.byZorn.get(partitionFactZorn);
          assertNotUndefined(partitionFact);

          return new PartitionedDirectoryInstance({
            partitionFact,
            directory,
          });
        });

      const partitionedFileList = fileMetadataList
        .flatMap(({ nodePath, partitionFactZornSet }) => {
          const file = fileVoictent.byNodePath.get(nodePath);
          assertNotUndefined(file);

          return [...partitionFactZornSet].map((partitionFactZorn) => {
            return {
              file,
              partitionFactZorn,
            };
          });
        })
        .map(({ file, partitionFactZorn }) => {
          const partitionFact =
            partitionFactVoictent.byZorn.get(partitionFactZorn);
          assertNotUndefined(partitionFact);

          return new PartitionedFileInstance({
            partitionFact,
            file,
          });
        });

      return {
        [PARTITIONED_DIRECTORY_GEPP]: partitionedDirectoryList,
        [PARTITIONED_FILE_GEPP]: partitionedFileList,
      };
    },
  )
  .assemble();
