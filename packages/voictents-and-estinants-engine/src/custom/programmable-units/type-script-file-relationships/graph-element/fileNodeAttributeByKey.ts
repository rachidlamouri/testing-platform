import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { DirectedGraphNode } from '../../graph-visualization/directed-graph/directedGraphNode';

export type FileNodeAttributeByKey = DirectedGraphNode['attributeByKey'];

export type FileNodeAttributeByKeyGrition = Grition<FileNodeAttributeByKey>;

export type FileNodeAttributeByKeyOdeshin =
  OdeshinFromGrition<FileNodeAttributeByKeyGrition>;

export const FILE_NODE_ATTRIBUTE_BY_KEY_GEPP = 'file-node-attribute-by-key';

export type FileNodeAttributeByKeyGepp = typeof FILE_NODE_ATTRIBUTE_BY_KEY_GEPP;

export type FileNodeAttributeByKeyVoictent = Voictent<
  FileNodeAttributeByKeyGepp,
  FileNodeAttributeByKeyOdeshin
>;
