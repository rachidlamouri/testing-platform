import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  PARTITIONED_BOUNDARY_LIST_TRIE_COLLECTION_ID,
  PartitionedBoundaryListTrie,
  PartitionedBoundaryListTrieStreamMetatype,
} from './partitionedBoundaryListTrie';
import {
  PARTITIONED_BOUNDARY_COLLECTION_ID,
  PartitionedBoundaryStreamMetatype,
} from './partitionedBoundary';

/**
 * Gathers boundaries into a trie data structure by their directory paths
 * without checking for overlapping boundaries
 */
export const getPartitionedBoundaryListTrie = buildProgrammedTransform({
  name: 'getPartitionedBoundaryListTrie',
})
  .fromCollection2<PartitionedBoundaryStreamMetatype>({
    collectionId: PARTITIONED_BOUNDARY_COLLECTION_ID,
  })
  .toItem2<PartitionedBoundaryListTrieStreamMetatype>({
    collectionId: PARTITIONED_BOUNDARY_LIST_TRIE_COLLECTION_ID,
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
