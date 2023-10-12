import { buildProgrammedTransform } from '../../../../adapter/estinant-builder/buildEstinant';
import {
  PARTITIONED_BOUNDARY_LIST_TRIE_GEPP,
  PartitionedBoundaryListTrie,
  PartitionedBoundaryListTrieVoque,
} from './partitionedBoundaryListTrie';
import {
  PARTITIONED_BOUNDARY_GEPP,
  PartitionedBoundaryVoque,
} from './partitionedBoundary';

/**
 * Gathers boundaries into a trie data structure by their directory paths
 * without checking for overlapping boundaries
 */
export const getPartitionedBoundaryListTrie = buildProgrammedTransform({
  name: 'getPartitionedBoundaryListTrie',
})
  .fromVoictent2<PartitionedBoundaryVoque>({
    collectionId: PARTITIONED_BOUNDARY_GEPP,
  })
  .toItem2<PartitionedBoundaryListTrieVoque>({
    collectionId: PARTITIONED_BOUNDARY_LIST_TRIE_GEPP,
  })
  .onTransform((partitionedBoundaryList) => {
    const trie = new PartitionedBoundaryListTrie([]);

    partitionedBoundaryList.forEach((partitionedBoundary) => {
      trie.addSubtrie(
        partitionedBoundary.boundary.directory.directoryPath.partList,
        () => {
          return new PartitionedBoundaryListTrie([]);
        },
        (boundaryListAtPath) => {
          boundaryListAtPath.push(partitionedBoundary);
          return boundaryListAtPath;
        },
      );
    });

    return trie;
  })
  .assemble();
