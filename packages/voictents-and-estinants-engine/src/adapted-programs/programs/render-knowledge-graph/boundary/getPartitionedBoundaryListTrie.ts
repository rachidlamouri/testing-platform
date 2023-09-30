import { buildEstinant } from '../../../../adapter/estinant-builder/buildEstinant';
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
export const getPartitionedBoundaryListTrie = buildEstinant({
  name: 'getPartitionedBoundaryListTrie',
})
  .fromVoictent2<PartitionedBoundaryVoque>({
    gepp: PARTITIONED_BOUNDARY_GEPP,
  })
  .toHubblepup2<PartitionedBoundaryListTrieVoque>({
    gepp: PARTITIONED_BOUNDARY_LIST_TRIE_GEPP,
  })
  .onPinbe((partitionedBoundaryList) => {
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
