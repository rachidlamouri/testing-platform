import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { Shape } from '../../graph-visualization/directed-graph/attribute';
import { EXTERNAL_BOUNDARY_ZORN } from './boundaryConfiguration';
import {
  BOUNDARY_METADATA_GEPP,
  BoundaryMetadataVoque,
} from './boundaryMetadata';
import { COMMON_ATTRIBUTE_BY_KEY, FONT_SIZE } from './commonAttributeByKey';
import { EXTERNAL_MODULE_GEPP, ExternalModuleVoque } from './externalModule';
import {
  EXTERNAL_MODULE_METADATA_GEPP,
  ExternalModuleMetadataVoque,
} from './externalModuleMetadata';

/**
 * Gets information that is used to present External TypeScript modules (ie.
 * first party node modules, and third party npm modules) and to associate them
 * with items from other collections.
 */
export const getExternalModuleMetadata = buildEstinant({
  name: 'getExternalModuleMetadata',
})
  .fromHubblepup2<ExternalModuleVoque>({
    gepp: EXTERNAL_MODULE_GEPP,
  })
  .andFromHubblepupTuple2<BoundaryMetadataVoque, [string]>({
    gepp: BOUNDARY_METADATA_GEPP,
    framate: () => [EXTERNAL_BOUNDARY_ZORN],
    croard: (rightInput) => rightInput.indexByName.zorn,
  })
  .toHubblepup2<ExternalModuleMetadataVoque>({
    gepp: EXTERNAL_MODULE_METADATA_GEPP,
  })
  .onPinbe((externalModule, [boundary]) => {
    return {
      zorn: externalModule.zorn,
      id: externalModule.instanceId,
      boundaryId: boundary.id,
      sourcePath: externalModule.sourcePath,
      attributeByKey: {
        label: externalModule.sourcePath,
        shape: Shape.Box,
        fontsize: FONT_SIZE.node,
        color: 'gray',
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
    };
  })
  .assemble();
