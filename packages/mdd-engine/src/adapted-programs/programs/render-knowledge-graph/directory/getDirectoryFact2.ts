import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { IdentifiableItemId } from '../../../../adapter/identifiable-item/identifiableItem';
import {
  BOUNDED_DIRECTORY_COLLECTION_ID,
  BoundedDirectoryStreamMetatype,
} from './boundedDirectory';
import {
  DIRECTORY_FACT_2_COLLECTION_ID,
  DirectoryFact2Instance,
  DirectoryFact2StreamMetatype,
} from './directoryFact2';
import {
  PARTITIONED_DIRECTORY_COLLECTION_ID,
  PartitionedDirectoryStreamMetatype,
} from './partitionedDirectory';

/**
 * Associates a partitioned directory to its bounded parent directory. Boundary
 * directories will not have a bounded parent directory.
 */
export const getDirectoryFact2 = buildProgrammedTransform({
  name: 'getDirectoryFact2',
})
  .fromItem2<PartitionedDirectoryStreamMetatype>({
    collectionId: PARTITIONED_DIRECTORY_COLLECTION_ID,
  })
  .andFromItemTuple2<BoundedDirectoryStreamMetatype, [] | [IdentifiableItemId]>(
    {
      collectionId: BOUNDED_DIRECTORY_COLLECTION_ID,
      getRightKeyTuple: (childDirectory) => {
        if (childDirectory.item.directory.isBoundaryDirectory) {
          return [];
        }

        const { parentDirectoryPath } =
          childDirectory.item.directory.directory.nodePath;

        return [parentDirectoryPath];
      },
      getRightKey: (potentialParentDirectory) => {
        return potentialParentDirectory.item.directory.directoryPath.serialized;
      },
    },
  )
  .toItem2<DirectoryFact2StreamMetatype>({
    collectionId: DIRECTORY_FACT_2_COLLECTION_ID,
  })
  .onTransform((childDirectory, [parentDirectory = null]) => {
    return new DirectoryFact2Instance({
      partitionFact: childDirectory.partitionFact,
      parentDirectory,
      directory: childDirectory.directory,
    });
  })
  .assemble();
