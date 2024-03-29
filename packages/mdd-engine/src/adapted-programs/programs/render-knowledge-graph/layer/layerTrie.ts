import { StandardInMemoryStreamMetatype } from '../../../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { Trie } from '../../../../package-agnostic-utilities/data-structure/trie';
import { Layer } from './layer';

/**
 * A trie data structure where each node can have at most one layer.
 */
export class LayerTrie extends Trie<Layer | null> {}

export const LAYER_TRIE_COLLECTION_ID = 'layer-trie';

type LayerTrieCollectionId = typeof LAYER_TRIE_COLLECTION_ID;

export type LayerTrieStreamMetatype = StandardInMemoryStreamMetatype<
  LayerTrieCollectionId,
  LayerTrie
>;
