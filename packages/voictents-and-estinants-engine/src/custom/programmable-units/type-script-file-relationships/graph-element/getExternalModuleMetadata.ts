import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { Shape } from '../../graph-visualization/directed-graph/attribute';
import {
  BOUNDARY_METADATA_GEPP,
  BoundaryMetadataVoictent,
} from './boundaryMetadata';
import { COMMON_ATTRIBUTE_BY_KEY, FONT_SIZE } from './commonAttributeByKey';
import { EXTERNAL_MODULE_GEPP, ExternalModuleVoictent } from './externalModule';
import {
  EXTERNAL_MODULE_METADATA_GEPP,
  ExternalModuleMetadataVoictent,
} from './externalModuleMetadata';

export const getExternalModuleMetadata = buildEstinant({
  name: 'getExternalModuleMetdata',
})
  .fromGrition<ExternalModuleVoictent>({
    gepp: EXTERNAL_MODULE_GEPP,
  })
  .andFromGritionTuple<BoundaryMetadataVoictent, [string]>({
    gepp: BOUNDARY_METADATA_GEPP,
    framate: () => ['external'],
    croard: (rightInput) => rightInput.zorn,
  })
  .toGrition<ExternalModuleMetadataVoictent>({
    gepp: EXTERNAL_MODULE_METADATA_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((externalModule, [boundary]) => {
    return {
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
