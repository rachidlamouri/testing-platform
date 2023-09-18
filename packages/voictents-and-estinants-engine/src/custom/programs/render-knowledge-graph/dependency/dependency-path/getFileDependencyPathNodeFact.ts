import { buildEstinant } from '../../../../adapter/estinant-builder/estinantBuilder';
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
export const getFileDependencyPathNodeFact = buildEstinant({
  name: 'getFileDependencyPathNodeFact',
})
  .fromHubblepup2<PartitionedFileDependencyPathNodeVoque>({
    gepp: PARTITIONED_FILE_DEPENDENCY_PATH_NODE_GEPP,
  })
  .andFromHubblepupTuple2<BoundedDirectoryVoque, [string]>({
    gepp: BOUNDED_DIRECTORY_GEPP,
    framate: (pathNode) => {
      return [pathNode.hubblepup.directoryPath];
    },
    croard: (directory) => {
      return directory.hubblepup.directory.directoryPath.serialized;
    },
  })
  .toHubblepup2<FileDependencyPathNodeFactVoque>({
    gepp: FILE_DEPENDENCY_PATH_NODE_FACT_GEPP,
  })
  .onPinbe((pathNode, [directory]) => {
    return new FileDependencyPathNodeFactInstance({
      pathNode,
      directory,
    });
  })
  .assemble();
