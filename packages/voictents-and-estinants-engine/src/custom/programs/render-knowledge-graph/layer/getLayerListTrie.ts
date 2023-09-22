import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { LAYER_GEPP, LayerVoque } from './layer';
import {
  LAYER_LIST_TRIE_GEPP,
  LayerListTrie,
  LayerListTrieVoque,
} from './layerListTrie';

/**
 * Puts each layer into a trie datastructure. This trie handles layers with
 * duplicate directories.
 */
export const getLayerListTrie = buildEstinant({
  name: 'getLayerListTrie',
})
  .fromVoictent2<LayerVoque>({
    gepp: LAYER_GEPP,
  })
  .toHubblepup2<LayerListTrieVoque>({
    gepp: LAYER_LIST_TRIE_GEPP,
  })
  .onPinbe((layerVoictent) => {
    const trie = new LayerListTrie([]);

    layerVoictent.forEach((layer) => {
      trie.addSubtrie(
        layer.directory.directoryPath.partList,
        () => {
          return new LayerListTrie([]);
        },
        (layerListAtPath) => {
          layerListAtPath.push(layer);
          return layerListAtPath;
        },
      );
    });

    return trie;
  })
  .assemble();
