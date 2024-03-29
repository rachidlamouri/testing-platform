import { StandardInMemoryStreamMetatype } from '../../../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { Trie } from '../../../../package-agnostic-utilities/data-structure/trie';
import { PartitionedBoundary } from './partitionedBoundary';

/**
 * A trie where nodes are either a single partitioned boundary or null
 */
export class PartitionedBoundaryTrie extends Trie<PartitionedBoundary | null> {}

export const PARTITIONED_BOUNDARY_TRIE_COLLECTION_ID =
  'partitioned-boundary-trie';

type PartitionedBoundaryTrieCollectionId =
  typeof PARTITIONED_BOUNDARY_TRIE_COLLECTION_ID;

export type PartitionedBoundaryTrieStreamMetatype =
  StandardInMemoryStreamMetatype<
    PartitionedBoundaryTrieCollectionId,
    PartitionedBoundaryTrie
  >;
