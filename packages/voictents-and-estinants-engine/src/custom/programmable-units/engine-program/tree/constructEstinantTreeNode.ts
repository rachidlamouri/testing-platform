import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  EstinantInputOutputParentVoictent,
  ESTINANT_INPUT_OUTPUT_PARENT_GEPP,
} from '../estinant-call-expression-parameter/estinantInputOutputParent';
import {
  EstinantInputListVoictent,
  ESTINANT_INPUT_LIST_GEPP,
} from '../estinant-input-output/estinantInputList';
import {
  EstinantOutputListVoictent,
  ESTINANT_OUTPUT_LIST_GEPP,
} from '../estinant-input-output/estinantOutputList';
import {
  EstinantTreeNodeVoictent,
  ESTINANT_TREE_NODE_GEPP,
} from './estinantTreeNode';

export const constructEstinantTreeNode = buildEstinant()
  .fromGrition<EstinantInputOutputParentVoictent>({
    gepp: ESTINANT_INPUT_OUTPUT_PARENT_GEPP,
  })
  .andFromHubblepupTuple<EstinantInputListVoictent, [string]>({
    gepp: ESTINANT_INPUT_LIST_GEPP,
    framate: (leftInput) => [leftInput.grition.inputListIdentifier],
    croard: (rightInput) => rightInput.zorn,
  })
  .andFromHubblepupTuple<EstinantOutputListVoictent, [string]>({
    gepp: ESTINANT_OUTPUT_LIST_GEPP,
    framate: (leftInput) => [leftInput.grition.outputListIdentifier],
    croard: (rightInput) => rightInput.zorn,
  })
  .toGrition<EstinantTreeNodeVoictent>({
    gepp: ESTINANT_TREE_NODE_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe(
    (estinantParent, [{ grition: inputList }], [{ grition: outputList }]) => {
      return {
        programName: estinantParent.programName,
        estinantName: estinantParent.estinantName,
        inputList: inputList.map(({ voictentName, index }) => ({
          voictentName,
          index,
        })),
        outputList: outputList.map(({ voictentName }) => ({
          voictentName,
        })),
      };
    },
  )
  .assemble();
