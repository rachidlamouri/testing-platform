import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import {
  EstinantInputOutputParentVoictent,
  ESTINANT_INPUT_OUTPUT_PARENT_GEPP,
} from '../estinant-call-expression-parameter/estinantInputOutputParent';
import {
  EstinantInput,
  EstinantInputListVoictent,
  ESTINANT_INPUT_LIST_GEPP,
} from '../estinant-input-output/estinantInputList';
import {
  EstinantOutput,
  EstinantOutputListVoictent,
  ESTINANT_OUTPUT_LIST_GEPP,
} from '../estinant-input-output/estinantOutputList';

export type EstinantTreeInputNode = Pick<
  EstinantInput,
  'voictentName' | 'index'
>;

export type EStinantTreeOutputNode = Pick<EstinantOutput, 'voictentName'>;

export type EstinantTreeNode = {
  programName: string;
  estinantName: string;
  inputList: EstinantTreeInputNode[];
  outputList: EStinantTreeOutputNode[];
};

export type EstinantTreeNodeGrition = Grition<EstinantTreeNode>;

export type EstinantTreeNodeOdeshin =
  OdeshinFromGrition<EstinantTreeNodeGrition>;

export const ESTINANT_TREE_NODE_GEPP = 'estinant-tree-node';

export type EstinantTreeNodeGepp = typeof ESTINANT_TREE_NODE_GEPP;

export type EstinantTreeNodeVoictent = Voictent<
  EstinantTreeNodeGepp,
  EstinantTreeNodeOdeshin
>;

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
