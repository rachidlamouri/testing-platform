import { buildProgrammedTransform } from '../../../../adapter/estinant-builder/buildEstinant';
import {
  DIRECTORY_GEPP,
  DirectoryVoque,
} from '../../../programmable-units/file/directory';
import { LAYER_GEPP, LayerInstance, LayerVoque } from './layer';
import {
  LAYER_CONFIGURATION_GEPP,
  LayerConfigurationVoque,
} from './layerConfiguration';

/**
 * Converts a layer configuration into a layer
 */
export const getLayer = buildProgrammedTransform({
  name: 'getLayer',
})
  .fromItem2<LayerConfigurationVoque>({
    collectionId: LAYER_CONFIGURATION_GEPP,
  })
  .andFromItemTuple2<DirectoryVoque, [string]>({
    collectionId: DIRECTORY_GEPP,
    getRightKeyTuple: (layer) => {
      return [layer.item.directoryPath];
    },
    getRightKey: (directory) => {
      return directory.item.directoryPath.serialized;
    },
  })
  .toItem2<LayerVoque>({
    collectionId: LAYER_GEPP,
  })
  .onTransform((layerConfiguration, [directory]) => {
    return new LayerInstance({
      layerConfiguration,
      directory,
    });
  })
  .assemble();
