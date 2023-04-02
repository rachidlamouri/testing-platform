import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { Directory } from '../../file/directory';
import { DirectedSubgraph } from '../../graph-visualization/directed-graph/directedGraph';

export type DirectorySubgraphAttributeByKey =
  DirectedSubgraph['attributeByKey'];

export type DirectorySubgraphAttributeByKeyGrition =
  Grition<DirectorySubgraphAttributeByKey>;

export type DirectorySubgraphAttributeByKeyOdeshin =
  OdeshinFromGrition<DirectorySubgraphAttributeByKeyGrition>;

export const DIRECTORY_SUBGRAPH_ATTRIBUTE_BY_KEY_GEPP =
  'directory-subgraph-attribute-by-key';

export type DirectorySubgraphAttributeByKeyGepp =
  typeof DIRECTORY_SUBGRAPH_ATTRIBUTE_BY_KEY_GEPP;

export type DirectorySubgraphAttributeByKeyVoictent = Voictent<
  DirectorySubgraphAttributeByKeyGepp,
  DirectorySubgraphAttributeByKeyOdeshin
>;

export const getSubgraphId = (
  directory: Directory,
): DirectorySubgraphAttributeByKey['id'] => `cluster_${directory.instanceId}`;
