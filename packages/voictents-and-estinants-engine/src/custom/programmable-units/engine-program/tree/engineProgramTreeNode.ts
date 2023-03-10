import { buildWattlection } from '../../../../type-script-adapter/estinant/wattlection';
import { Vicken } from '../../../../type-script-adapter/vicken';
import { Vition } from '../../../../type-script-adapter/vition';
import { Tuple } from '../../../../utilities/semantic-types/tuple';
import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { EngineProgramVoictent, ENGINE_PROGRAM_GEPP } from '../engineProgram';
import {
  EstinantTreeNode,
  EstinantTreeNodeVoictent,
  ESTINANT_TREE_NODE_GEPP,
} from './estinantTreeNode';

export type EngineProgramEstinantTreeNode = Pick<
  EstinantTreeNode,
  'estinantName' | 'inputList' | 'outputList'
>;

export type EngineProgramTreeNode = {
  programName: string;
  estinantList: EngineProgramEstinantTreeNode[];
};

export type EngineProgramTreeNodeGrition = Grition<EngineProgramTreeNode>;

export type EngineProgramTreeNodeOdeshin =
  OdeshinFromGrition<EngineProgramTreeNodeGrition>;

export const ENGINE_PROGRAM_TREE_NODE_GEPP = 'engine-program-tree-node';

export type EngineProgramTreeNodeGepp = typeof ENGINE_PROGRAM_TREE_NODE_GEPP;

export type EngineProgramTreeNodeVoictent = Voictent<
  EngineProgramTreeNodeGepp,
  EngineProgramTreeNodeOdeshin
>;

export const engineProgramTreeNodeWattlection = buildWattlection<
  Vition<
    EngineProgramVoictent,
    [Vicken<EstinantTreeNodeVoictent, Tuple<EstinantTreeNodeVoictent>, string>]
  >,
  EngineProgramTreeNodeVoictent
>({
  leftGepp: ENGINE_PROGRAM_GEPP,
  rightAppreffingeTuple: [
    {
      gepp: ESTINANT_TREE_NODE_GEPP,
      croard: (rightInput): string => rightInput.zorn,
      framate: (leftInput): string[] =>
        leftInput.grition.estinantIdentifierList,
    },
  ],
  outputGepp: ENGINE_PROGRAM_TREE_NODE_GEPP,
  pinbe: (leftInput, rightInputList) => {
    const engineProgram = leftInput.grition;

    const estinantTreeNodeList = rightInputList.map(({ grition }) => grition);

    return {
      zorn: leftInput.zorn,
      grition: {
        programName: engineProgram.programName,
        estinantList: estinantTreeNodeList.map<EngineProgramEstinantTreeNode>(
          ({ estinantName, inputList, outputList }) => ({
            estinantName,
            inputList,
            outputList,
          }),
        ),
      },
    };
  },
});
