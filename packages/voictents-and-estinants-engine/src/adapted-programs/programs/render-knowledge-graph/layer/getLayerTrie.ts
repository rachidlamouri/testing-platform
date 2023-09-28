import { hasOneElement } from '../../../../package-agnostic-utilities/array/hasOneElement';
import { buildEstinant } from '../../../../adapter/estinant-builder/estinantBuilder';
import { LAYER_LIST_TRIE_GEPP, LayerListTrieVoque } from './layerListTrie';
import { LAYER_TRIE_GEPP, LayerTrie, LayerTrieVoque } from './layerTrie';

/**
 * Converts a layer list trie into a trie where each node can only have one
 * layer. It ignores nodes with more than one layer.
 */
export const getLayerTrie = buildEstinant({
  name: 'getLayerTrie',
})
  .fromHubblepup2<LayerListTrieVoque>({
    gepp: LAYER_LIST_TRIE_GEPP,
  })
  .toHubblepup2<LayerTrieVoque>({
    gepp: LAYER_TRIE_GEPP,
  })
  .onPinbe((layerListTrie) => {
    const layerTrie = new LayerTrie(null);

    layerListTrie
      .flatten()
      .map((subtrie) => subtrie.value)
      .filter(hasOneElement)
      .forEach(([layer]) => {
        layerTrie.addSubtrie(
          layer.directory.directoryPath.partList,
          () => new LayerTrie(null),
          () => {
            return layer;
          },
        );
      });

    return layerTrie;
  })
  .assemble();
