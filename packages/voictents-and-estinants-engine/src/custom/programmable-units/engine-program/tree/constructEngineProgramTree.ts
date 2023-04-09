import { Tuple } from '../../../../utilities/semantic-types/tuple';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { EngineProgramVoictent, ENGINE_PROGRAM_GEPP } from '../engineProgram';
import {
  EngineProgramTreeNodeVoictent,
  ENGINE_PROGRAM_TREE_NODE_GEPP,
  EngineProgramEstinantTreeNode,
} from './engineProgramTreeNode';
import {
  EstinantTreeNodeVoictent,
  ESTINANT_TREE_NODE_GEPP,
} from './estinantTreeNode';

export const constructEngineProgramTree = buildEstinant({
  name: 'constructEngineProgramTree',
})
  .fromGrition<EngineProgramVoictent>({
    gepp: ENGINE_PROGRAM_GEPP,
  })
  .andFromHubblepupTuple<EstinantTreeNodeVoictent, Tuple<string>>({
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
