import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  PARTITIONED_FILE_COLLECTION_ID,
  PartitionedFileInstance,
  PartitionedFileStreamMetatype,
} from './file/partitionedFile';
import {
  PARTITION_FACT_COLLECTION_ID,
  PartitionFactStreamMetatype,
} from './partition-fact/partitionFact';
import {
  FILE_DEPENDENCY_COLLECTION_ID,
  FileDependencyStreamMetatype,
} from './dependency/fileDependency';
import { assertNotUndefined } from '../../../package-agnostic-utilities/nil/assertNotUndefined';
import {
  PARTITIONED_DIRECTORY_COLLECTION_ID,
  PartitionedDirectoryInstance,
  PartitionedDirectoryStreamMetatype,
} from './directory/partitionedDirectory';
import {
  BOUNDED_DIRECTORY_COLLECTION_ID,
  BoundedDirectoryStreamMetatype,
} from './directory/boundedDirectory';
import {
  BOUNDED_FILE_COLLECTION_ID,
  BoundedFileStreamMetatype,
} from './file/boundedFile';

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
  .fromCollection2<PartitionFactStreamMetatype>({
    collectionId: PARTITION_FACT_COLLECTION_ID,
  })
  .andFromCollection2<BoundedDirectoryStreamMetatype>({
    collectionId: BOUNDED_DIRECTORY_COLLECTION_ID,
  })
  .andFromCollection2<BoundedFileStreamMetatype>({
    collectionId: BOUNDED_FILE_COLLECTION_ID,
  })
  .andFromCollection2<FileDependencyStreamMetatype>({
    collectionId: FILE_DEPENDENCY_COLLECTION_ID,
  })
  .toItemTuple2<PartitionedDirectoryStreamMetatype>({
    collectionId: PARTITIONED_DIRECTORY_COLLECTION_ID,
  })
  .toItemTuple2<PartitionedFileStreamMetatype>({
    collectionId: PARTITIONED_FILE_COLLECTION_ID,
  })
  .onTransform(
    (
      partitionFactCollection,
      directoryCollection,
      fileCollection,
      fileDependencyCollection,
    ) => {
      type LocalFileSystemNodeMetadata = {
        isDirectory: boolean;
        nodePath: string;
        partitionFactIdSet: Set<string>;
      };

      const localMetadataByNodePath = new Map<
        string,
        LocalFileSystemNodeMetadata
      >(
        [
          ...directoryCollection.list.map((directory) => {
            return {
              isDirectory: true,
              fileSystemNode: directory,
            };
          }),
          ...fileCollection.list.map((file) => {
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
              partitionFactIdSet: new Set<string>(),
            },
          ];
        }),
      );

      fileDependencyCollection.list
        .map(({ importingFile, importedFile }) => {
          const nodePathSet = new Set([
            importingFile.nodePath.serialized,
            ...importingFile.directoryPathSetFromBoundary,
            importedFile.nodePath.serialized,
            ...importedFile.directoryPathSetFromBoundary,
          ]);

          const partitionFactIdSet = new Set([
            importingFile.sourcePartitionFact.id.forHuman,
            importedFile.sourcePartitionFact.id.forHuman,
          ]);

          return {
            nodePathSet,
            partitionFactIdSet,
          };
        })
        .flatMap(({ nodePathSet, partitionFactIdSet }) => {
          return [...nodePathSet].flatMap((nodePath) => {
            return [...partitionFactIdSet].map((partitionFactId) => {
              return {
                nodePath,
                partitionFactId,
              };
            });
          });
        })
        .forEach(({ nodePath, partitionFactId }) => {
          const localMetadata = localMetadataByNodePath.get(nodePath);
          assertNotUndefined(localMetadata);

          localMetadata.partitionFactIdSet.add(partitionFactId);
        });

      const allMetadataList = [...localMetadataByNodePath.values()];

      const directoryMetadataList = allMetadataList.filter(
        (metadata) => metadata.isDirectory,
      );

      const fileMetadataList = allMetadataList.filter(
        (metadata) => !metadata.isDirectory,
      );

      const partitionedDirectoryList = directoryMetadataList
        .flatMap(({ nodePath, partitionFactIdSet }) => {
          const directory = directoryCollection.byNodePath.get(nodePath);
          assertNotUndefined(directory);

          return [...partitionFactIdSet].map((partitionFactId) => {
            return {
              directory,
              partitionFactId,
            };
          });
        })
        .map(({ directory, partitionFactId }) => {
          const partitionFact =
            partitionFactCollection.byId.get(partitionFactId);
          assertNotUndefined(partitionFact);

          return new PartitionedDirectoryInstance({
            partitionFact,
            directory,
          });
        });

      const partitionedFileList = fileMetadataList
        .flatMap(({ nodePath, partitionFactIdSet }) => {
          const file = fileCollection.byNodePath.get(nodePath);
          assertNotUndefined(file);

          return [...partitionFactIdSet].map((partitionFactId) => {
            return {
              file,
              partitionFactId,
            };
          });
        })
        .map(({ file, partitionFactId }) => {
          const partitionFact =
            partitionFactCollection.byId.get(partitionFactId);
          assertNotUndefined(partitionFact);

          return new PartitionedFileInstance({
            partitionFact,
            file,
          });
        });

      return {
        [PARTITIONED_DIRECTORY_COLLECTION_ID]: partitionedDirectoryList,
        [PARTITIONED_FILE_COLLECTION_ID]: partitionedFileList,
      };
    },
  )
  .assemble();
