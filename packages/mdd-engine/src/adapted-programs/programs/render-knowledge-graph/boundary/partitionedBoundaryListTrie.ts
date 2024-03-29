import { StandardInMemoryStreamMetatype } from '../../../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { Trie } from '../../../../package-agnostic-utilities/data-structure/trie';
import { PartitionedBoundary } from './partitionedBoundary';

/**
 * A trie where nodes are always a list of zero or more paritioned boundaries.
 * This lets us handle overlapping boundaries without having to error check right away.
 */
export class PartitionedBoundaryListTrie extends Trie<PartitionedBoundary[]> {}

export const PARTITIONED_BOUNDARY_LIST_TRIE_COLLECTION_ID =
  'partitioned-boundary-list-trie';

type PartitionedBoundaryListTrieCollectionId =
  typeof PARTITIONED_BOUNDARY_LIST_TRIE_COLLECTION_ID;

export type PartitionedBoundaryListTrieStreamMetatype =
  StandardInMemoryStreamMetatype<
    PartitionedBoundaryListTrieCollectionId,
    PartitionedBoundaryListTrie
  >;
