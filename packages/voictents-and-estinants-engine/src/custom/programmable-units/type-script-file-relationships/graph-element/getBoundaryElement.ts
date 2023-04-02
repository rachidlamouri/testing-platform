import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  BoundaryConfigurationVoictent,
  BOUNDARY_CONFIGURATION_GEPP,
} from '../boundaryConfiguration';
import {
  CustomGraphElement,
  CustomGraphElementTypName,
  CustomGraphElementVoictent,
  CUSTOM_GRAPH_ELEMENT_GEPP,
} from './customGraphElement';

export const getBoundaryElement = buildEstinant()
  .fromGrition<BoundaryConfigurationVoictent>({
    gepp: BOUNDARY_CONFIGURATION_GEPP,
  })
  .toGrition<CustomGraphElementVoictent>({
    gepp: CUSTOM_GRAPH_ELEMENT_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((input) => {
    const graphElement: CustomGraphElement = {
      typeName: CustomGraphElementTypName.Boundary,
      metadata: {
        directoryPath: input.directoryPath,
      },
    };

    return graphElement;
  })
  .assemble();
