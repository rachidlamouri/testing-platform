import { buildEstinant } from '../../../../adapter/estinant-builder/buildEstinant';
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
export const getLayer = buildEstinant({
  name: 'getLayer',
})
  .fromHubblepup2<LayerConfigurationVoque>({
    gepp: LAYER_CONFIGURATION_GEPP,
  })
  .andFromHubblepupTuple2<DirectoryVoque, [string]>({
    gepp: DIRECTORY_GEPP,
    framate: (layer) => {
      return [layer.hubblepup.directoryPath];
    },
    croard: (directory) => {
      return directory.hubblepup.directoryPath.serialized;
    },
  })
  .toHubblepup2<LayerVoque>({
    gepp: LAYER_GEPP,
  })
  .onPinbe((layerConfiguration, [directory]) => {
    return new LayerInstance({
      layerConfiguration,
      directory,
    });
  })
  .assemble();
