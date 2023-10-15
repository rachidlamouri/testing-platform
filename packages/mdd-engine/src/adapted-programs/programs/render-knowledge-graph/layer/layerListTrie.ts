import { StandardInMemoryStreamMetatype } from '../../../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { Trie } from '../../../../package-agnostic-utilities/data-structure/trie';
import { Layer } from './layer';

/**
 * A trie data structure that accounts for two layers with the same directory
 */
export class LayerListTrie extends Trie<Layer[]> {}

export const LAYER_LIST_TRIE_COLLECTION_ID = 'layer-list-trie';

type LayerListTrieCollectionId = typeof LAYER_LIST_TRIE_COLLECTION_ID;

export type LayerListTrieStreamMetatype = StandardInMemoryStreamMetatype<
  LayerListTrieCollectionId,
  LayerListTrie
>;
