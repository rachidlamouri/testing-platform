// TODO: make a custom adapter wattlection
import { buildWattlection } from '../../../../type-script-adapter/estinant/wattlection';
import { Vicken } from '../../../../type-script-adapter/vicken';
import { Vition } from '../../../../type-script-adapter/vition';
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

export const estinantTreeNodeWattlection = buildWattlection<
  Vition<
    EstinantInputOutputParentVoictent,
    [
      Vicken<EstinantInputListVoictent, [EstinantInputListVoictent], string>,
      Vicken<EstinantOutputListVoictent, [EstinantOutputListVoictent], string>,
    ]
  >,
  EstinantTreeNodeVoictent
>({
  leftGepp: ESTINANT_INPUT_OUTPUT_PARENT_GEPP,
  rightAppreffingeTuple: [
    {
      gepp: ESTINANT_INPUT_LIST_GEPP,
      croard: (rightInput): string => rightInput.zorn,
      framate: (leftInput) => [leftInput.grition.inputListIdentifier] as const,
    },
    {
      gepp: ESTINANT_OUTPUT_LIST_GEPP,
      croard: (rightInput): string => rightInput.zorn,
      framate: (leftInput) => [leftInput.grition.outputListIdentifier] as const,
    },
  ],
  outputGepp: ESTINANT_TREE_NODE_GEPP,
  pinbe: (leftInput, [{ grition: inputList }], [{ grition: outputList }]) => {
    const estinantParent = leftInput.grition;

    return {
      zorn: leftInput.zorn,
      grition: {
        programName: estinantParent.programName,
        estinantName: estinantParent.estinantName,
        inputList: inputList.map(({ voictentName, index }) => ({
          voictentName,
          index,
        })),
        outputList: outputList.map(({ voictentName }) => ({
          voictentName,
        })),
      },
    };
  },
});
