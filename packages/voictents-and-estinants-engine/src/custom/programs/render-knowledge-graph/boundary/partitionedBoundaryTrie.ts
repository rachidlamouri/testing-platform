import { StandardInMemoryVoque } from '../../../../core/engine/inMemoryVoque';
import { Trie } from '../../../../utilities/trie';
import { PartitionedBoundary } from './partitionedBoundary';

/**
 * A trie where nodes are either a single partitioned boundary or null
 */
export class PartitionedBoundaryTrie extends Trie<PartitionedBoundary | null> {}

export const PARTITIONED_BOUNDARY_TRIE_GEPP = 'partitioned-boundary-trie';

type PartitionedBoundaryTrieGepp = typeof PARTITIONED_BOUNDARY_TRIE_GEPP;

export type PartitionedBoundaryTrieVoque = StandardInMemoryVoque<
  PartitionedBoundaryTrieGepp,
  PartitionedBoundaryTrie
>;