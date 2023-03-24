import { Tuple } from '../../../../utilities/semantic-types/tuple';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
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

export const constructEngineProgramTree = buildEstinant()
  .fromGrition<EngineProgramVoictent>({
    gepp: ENGINE_PROGRAM_GEPP,
  })
  .andFromHubblepupTuple<
    EstinantTreeNodeVoictent,
    Tuple<EstinantTreeNodeVoictent>,
    string
  >({
    gepp: ESTINANT_TREE_NODE_GEPP,
    framate: (leftInput) => leftInput.grition.estinantIdentifierList,
    croard: (rightInput) => rightInput.zorn,
  })
  .toGrition<EngineProgramTreeNodeVoictent>({
    gepp: ENGINE_PROGRAM_TREE_NODE_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((engineProgram, rightInputList) => {
    const estinantTreeNodeList = rightInputList.map(({ grition }) => grition);

    return {
      programName: engineProgram.programName,
      estinantList: estinantTreeNodeList.map<EngineProgramEstinantTreeNode>(
        ({ estinantName, inputList, outputList }) => ({
          estinantName,
          inputList,
          outputList,
        }),
      ),
    };
  })
  .assemble();
