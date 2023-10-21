import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { LAYER_COLLECTION_ID, LayerStreamMetatype } from './layer';
import {
  LAYER_LIST_TRIE_COLLECTION_ID,
  LayerListTrie,
  LayerListTrieStreamMetatype,
} from './layerListTrie';

/**
 * Puts each layer into a trie datastructure. This trie handles layers with
 * duplicate directories.
 */
export const getLayerListTrie = buildProgrammedTransform({
  name: 'getLayerListTrie',
})
  .fromCollection2<LayerStreamMetatype>({
    collectionId: LAYER_COLLECTION_ID,
  })
  .toItem2<LayerListTrieStreamMetatype>({
    collectionId: LAYER_LIST_TRIE_COLLECTION_ID,
  })
  .onTransform((layerCollection) => {
    const trie = new LayerListTrie([]);

    layerCollection.list.forEach((layer) => {
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
