import { StandardInMemoryVoque } from '../../../../core/engine/inMemoryVoque';
import { Trie } from '../../../../utilities/trie';
import { Layer } from './layer';

/**
 * A trie data structure that accounts for two layers with the same directory
 */
export class LayerListTrie extends Trie<Layer[]> {}

export const LAYER_LIST_TRIE_GEPP = 'layer-list-trie';

type LayerListTrieGepp = typeof LAYER_LIST_TRIE_GEPP;

export type LayerListTrieVoque = StandardInMemoryVoque<
  LayerListTrieGepp,
  LayerListTrie
>;
