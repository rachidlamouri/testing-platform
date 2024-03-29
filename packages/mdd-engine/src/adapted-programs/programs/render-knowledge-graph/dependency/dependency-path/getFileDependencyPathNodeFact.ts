import { buildProgrammedTransform } from '../../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  BOUNDED_DIRECTORY_COLLECTION_ID,
  BoundedDirectoryStreamMetatype,
} from '../../directory/boundedDirectory';
import {
  FILE_DEPENDENCY_PATH_NODE_FACT_COLLECTION_ID,
  FileDependencyPathNodeFactInstance,
  FileDependencyPathNodeFactStreamMetatype,
} from './fileDependencyPathNodeFact';
import {
  PARTITIONED_FILE_DEPENDENCY_PATH_NODE_COLLECTION_ID,
  PartitionedFileDependencyPathNodeStreamMetatype,
} from './partitionedFileDependencyPathNode';

/**
 * Constructs a FileDependencyPathNodeFact from a path node and the directory it
 * resides in
 */
export const getFileDependencyPathNodeFact = buildProgrammedTransform({
  name: 'getFileDependencyPathNodeFact',
})
  .fromItem2<PartitionedFileDependencyPathNodeStreamMetatype>({
    collectionId: PARTITIONED_FILE_DEPENDENCY_PATH_NODE_COLLECTION_ID,
  })
  .andFromItemTuple2<BoundedDirectoryStreamMetatype, [string]>({
    collectionId: BOUNDED_DIRECTORY_COLLECTION_ID,
    getRightKeyTuple: (pathNode) => {
      return [pathNode.item.directoryPath];
    },
    getRightKey: (directory) => {
      return directory.item.directory.directoryPath.serialized;
    },
  })
  .toItem2<FileDependencyPathNodeFactStreamMetatype>({
    collectionId: FILE_DEPENDENCY_PATH_NODE_FACT_COLLECTION_ID,
  })
  .onTransform((pathNode, [directory]) => {
    return new FileDependencyPathNodeFactInstance({
      pathNode,
      directory,
    });
  })
  .assemble();
