import { hasOneElement } from '../../../../package-agnostic-utilities/array/hasOneElement';
import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  LAYER_LIST_TRIE_COLLECTION_ID,
  LayerListTrieStreamMetatype,
} from './layerListTrie';
import {
  LAYER_TRIE_COLLECTION_ID,
  LayerTrie,
  LayerTrieStreamMetatype,
} from './layerTrie';

/**
 * Converts a layer list trie into a trie where each node can only have one
 * layer. It ignores nodes with more than one layer.
 */
export const getLayerTrie = buildProgrammedTransform({
  name: 'getLayerTrie',
})
  .fromItem2<LayerListTrieStreamMetatype>({
    collectionId: LAYER_LIST_TRIE_COLLECTION_ID,
  })
  .toItem2<LayerTrieStreamMetatype>({
    collectionId: LAYER_TRIE_COLLECTION_ID,
  })
  .onTransform((layerListTrie) => {
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
