import { StandardInMemoryVoque } from '../../../../core/engine/inMemoryVoque';
import { Trie } from '../../../../package-agnostic-utilities/datastructure/trie';
import { PartitionedBoundary } from './partitionedBoundary';

/**
 * A trie where nodes are always a list of zero or more paritioned boundaries.
 * This lets us handle overlapping boundaries without having to error check right away.
 */
export class PartitionedBoundaryListTrie extends Trie<PartitionedBoundary[]> {}

export const PARTITIONED_BOUNDARY_LIST_TRIE_GEPP =
  'partitioned-boundary-list-trie';

type PartitionedBoundaryListTrieGepp =
  typeof PARTITIONED_BOUNDARY_LIST_TRIE_GEPP;

export type PartitionedBoundaryListTrieVoque = StandardInMemoryVoque<
  PartitionedBoundaryListTrieGepp,
  PartitionedBoundaryListTrie
>;
