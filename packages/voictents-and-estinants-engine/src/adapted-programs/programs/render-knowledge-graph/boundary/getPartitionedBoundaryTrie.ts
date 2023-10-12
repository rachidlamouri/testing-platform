import { buildProgrammedTransform } from '../../../../adapter/estinant-builder/buildEstinant';
import { hasOneElement } from '../../../../package-agnostic-utilities/array/hasOneElement';
import {
  PARTITIONED_BOUNDARY_LIST_TRIE_GEPP,
  PartitionedBoundaryListTrieVoque,
} from './partitionedBoundaryListTrie';
import {
  PARTITIONED_BOUNDARY_TRIE_GEPP,
  PartitionedBoundaryTrie,
  PartitionedBoundaryTrieVoque,
} from './partitionedBoundaryTrie';

/**
 * Constructs a second trie data structure out of the partitioned boundary list
 * trie for valid portions of the trie. That is partitioned boundary lists with
 * exactly one partitioned boundary
 */
export const getPartitionedBoundaryTrie = buildProgrammedTransform({
  name: 'getPartitionedBoundaryTrie',
})
  .fromItem2<PartitionedBoundaryListTrieVoque>({
    collectionId: PARTITIONED_BOUNDARY_LIST_TRIE_GEPP,
  })
  .toItem2<PartitionedBoundaryTrieVoque>({
    collectionId: PARTITIONED_BOUNDARY_TRIE_GEPP,
  })
  .onTransform((partitionedBoundaryListTrie) => {
    const partitionedBoundaryTrie = new PartitionedBoundaryTrie(null);
    partitionedBoundaryListTrie
      .flatten()
      .map((subtrie) => subtrie.value)
      .filter(hasOneElement)
      .forEach(([partitionedBoundary]) => {
        partitionedBoundaryTrie.addSubtrie(
          partitionedBoundary.boundary.directory.directoryPath.partList,
          () => new PartitionedBoundaryTrie(null),
          () => {
            return partitionedBoundary;
          },
        );
      });

    return partitionedBoundaryTrie;
  })
  .assemble();
