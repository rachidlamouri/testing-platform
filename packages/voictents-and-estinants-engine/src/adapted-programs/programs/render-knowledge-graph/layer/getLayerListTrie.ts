import { buildProgrammedTransform } from '../../../../adapter/estinant-builder/buildEstinant';
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
export const getLayerListTrie = buildProgrammedTransform({
  name: 'getLayerListTrie',
})
  .fromVoictent2<LayerVoque>({
    collectionId: LAYER_GEPP,
  })
  .toItem2<LayerListTrieVoque>({
    collectionId: LAYER_LIST_TRIE_GEPP,
  })
  .onTransform((layerVoictent) => {
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
