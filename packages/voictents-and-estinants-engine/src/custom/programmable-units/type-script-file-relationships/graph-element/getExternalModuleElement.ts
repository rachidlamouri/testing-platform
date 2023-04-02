import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  ExternalModuleVoictent,
  EXTERNAL_MODULE_GEPP,
} from '../externalModule';
import {
  CustomGraphElementVoictent,
  CUSTOM_GRAPH_ELEMENT_GEPP,
  CustomGraphElement,
  CustomGraphElementTypName,
} from './customGraphElement';

export const getExternalModuleElement = buildEstinant()
  .fromGrition<ExternalModuleVoictent>({
    gepp: EXTERNAL_MODULE_GEPP,
  })
  .toGrition<CustomGraphElementVoictent>({
    gepp: CUSTOM_GRAPH_ELEMENT_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((input) => {
    const graphElement: CustomGraphElement = {
      typeName: CustomGraphElementTypName.Module,
      metadata: {
        modulePath: input.modulePath,
      },
    };

    return graphElement;
  })
  .assemble();
