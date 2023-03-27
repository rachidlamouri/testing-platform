import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { EstinantInput } from '../estinant-input-output/estinantInputList';
import { EstinantOutput } from '../estinant-input-output/estinantOutputList';

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
