import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { Shape } from '../../graph-visualization/directed-graph/attribute';
import { COMMON_ATTRIBUTE_BY_KEY } from './commonAttributeByKey';
import { EXTERNAL_MODULE_GEPP, ExternalModuleVoictent } from './externalModule';
import {
  FILE_NODE_ATTRIBUTE_BY_KEY_GEPP,
  FileNodeAttributeByKeyVoictent,
} from './fileNodeAttributeByKey';

export const getExternalModuleNodeAttributeByKey = buildEstinant({
  name: 'getExternalModuleNodeAttributeByKey',
})
  .fromGrition<ExternalModuleVoictent>({
    gepp: EXTERNAL_MODULE_GEPP,
  })
  .toGrition<FileNodeAttributeByKeyVoictent>({
    gepp: FILE_NODE_ATTRIBUTE_BY_KEY_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((externalModule) => {
    return {
      id: externalModule.instanceId,
      label: externalModule.sourcePath,
      shape: Shape.Box,
      fontsize: 14,
      ...COMMON_ATTRIBUTE_BY_KEY,
    };
  })
  .assemble();
