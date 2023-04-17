import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_ESTINANT_GEPP,
  EngineEstinantVoictent,
} from '../engineEstinant';
import {
  ESTINANT_TREE_NODE_GEPP,
  EstinantTreeNodeVoictent,
} from './estinantTreeNode';

export const constructEstinantTreeNode = buildEstinant({
  name: 'constructEstinantTreeNode',
})
  .fromGrition<EngineEstinantVoictent>({
    gepp: ENGINE_ESTINANT_GEPP,
  })
  .toGrition<EstinantTreeNodeVoictent>({
    gepp: ESTINANT_TREE_NODE_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((engineEstinant) => {
    return {
      programName: engineEstinant.programName,
      estinantName: engineEstinant.estinantName,
      inputList: engineEstinant.inputList.map(({ voictentName, index }) => ({
        voictentName,
        index,
      })),
      outputList: engineEstinant.outputList.map(({ voictentName }) => ({
        voictentName,
      })),
    };
  })
  .assemble();
