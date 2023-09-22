import { StandardInMemoryVoque } from '../../../../core/engine/inMemoryVoque';
import { Trie } from '../../../../utilities/trie';
import { Layer } from './layer';

/**
 * A trie data structure where each node can have at most one layer.
 */
export class LayerTrie extends Trie<Layer | null> {}

export const LAYER_TRIE_GEPP = 'layer-trie';

type LayerTrieGepp = typeof LAYER_TRIE_GEPP;

export type LayerTrieVoque = StandardInMemoryVoque<LayerTrieGepp, LayerTrie>;
