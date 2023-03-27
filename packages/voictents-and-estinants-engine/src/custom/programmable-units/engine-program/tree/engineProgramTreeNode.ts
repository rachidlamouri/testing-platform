import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { EstinantTreeNode } from './estinantTreeNode';

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
