import { buildProgrammedTransform } from '../../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  BOUNDED_DIRECTORY_GEPP,
  BoundedDirectoryVoque,
} from '../../directory/boundedDirectory';
import {
  FILE_DEPENDENCY_PATH_NODE_FACT_GEPP,
  FileDependencyPathNodeFactInstance,
  FileDependencyPathNodeFactVoque,
} from './fileDependencyPathNodeFact';
import {
  PARTITIONED_FILE_DEPENDENCY_PATH_NODE_GEPP,
  PartitionedFileDependencyPathNodeVoque,
} from './partitionedFileDependencyPathNode';

/**
 * Constructs a FileDependencyPathNodeFact from a path node and the directory it
 * resides in
 */
export const getFileDependencyPathNodeFact = buildProgrammedTransform({
  name: 'getFileDependencyPathNodeFact',
})
  .fromItem2<PartitionedFileDependencyPathNodeVoque>({
    collectionId: PARTITIONED_FILE_DEPENDENCY_PATH_NODE_GEPP,
  })
  .andFromItemTuple2<BoundedDirectoryVoque, [string]>({
    collectionId: BOUNDED_DIRECTORY_GEPP,
    getRightKeyTuple: (pathNode) => {
      return [pathNode.item.directoryPath];
    },
    getRightKey: (directory) => {
      return directory.item.directory.directoryPath.serialized;
    },
  })
  .toItem2<FileDependencyPathNodeFactVoque>({
    collectionId: FILE_DEPENDENCY_PATH_NODE_FACT_GEPP,
  })
  .onTransform((pathNode, [directory]) => {
    return new FileDependencyPathNodeFactInstance({
      pathNode,
      directory,
    });
  })
  .assemble();
