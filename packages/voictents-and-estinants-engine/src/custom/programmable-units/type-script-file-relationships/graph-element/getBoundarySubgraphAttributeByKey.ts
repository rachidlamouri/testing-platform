import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  BOUNDARY_CONFIGURATION_GEPP,
  BoundaryConfigurationVoictent,
} from '../boundaryConfiguration';
import {
  BOUNDARY_SUBGRAPH_ATTRIBUTE_BY_KEY_GEPP,
  BoundarySubgraphAttributeByKeyVoictent,
} from './boundarySubgraphAttributeByKey';
import {
  BOUNDARY_FONT_SIZE,
  COMMON_ATTRIBUTE_BY_KEY,
} from './commonAttributeByKey';

export const getBoundarySubgraphAttributeByKey = buildEstinant()
  .fromGrition<BoundaryConfigurationVoictent>({
    gepp: BOUNDARY_CONFIGURATION_GEPP,
  })
  .toGrition<BoundarySubgraphAttributeByKeyVoictent>({
    gepp: BOUNDARY_SUBGRAPH_ATTRIBUTE_BY_KEY_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((boundary) => {
    return {
      id: boundary.instanceId,
      label: boundary.directoryPath,
      fontsize: BOUNDARY_FONT_SIZE,
      ...COMMON_ATTRIBUTE_BY_KEY,
    };
  })
  .assemble();
