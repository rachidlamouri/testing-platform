import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  DIRECTORY_COLLECTION_ID,
  DirectoryStreamMetatype,
} from '../../../programmable-units/file/directory';
import {
  LAYER_COLLECTION_ID,
  LayerInstance,
  LayerStreamMetatype,
} from './layer';
import {
  LAYER_CONFIGURATION_COLLECTION_ID,
  LayerConfigurationStreamMetatype,
} from './layerConfiguration';

/**
 * Converts a layer configuration into a layer
 */
export const getLayer = buildProgrammedTransform({
  name: 'getLayer',
})
  .fromItem2<LayerConfigurationStreamMetatype>({
    collectionId: LAYER_CONFIGURATION_COLLECTION_ID,
  })
  .andFromItemTuple2<DirectoryStreamMetatype, [string]>({
    collectionId: DIRECTORY_COLLECTION_ID,
    getRightKeyTuple: (layer) => {
      return [layer.item.directoryPath];
    },
    getRightKey: (directory) => {
      return directory.item.directoryPath.serialized;
    },
  })
  .toItem2<LayerStreamMetatype>({
    collectionId: LAYER_COLLECTION_ID,
  })
  .onTransform((layerConfiguration, [directory]) => {
    return new LayerInstance({
      layerConfiguration,
      directory,
    });
  })
  .assemble();
