import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { DIRECTORY_GEPP, DirectoryVoictent } from '../../file/directory';
import { ROOT_DIRECTED_GRAPH_ATTRIBUTE_BY_KEY } from './rootDirectedGraph';
import {
  SubgraphToGraphRelationshipVoictent,
  SUBGRAPH_TO_GRAPH_RELATIONSHIP_GEPP,
} from './subgraphToGraphRelationship';

export const getDirectorySubgraphToParentRelationship = buildEstinant()
  .fromGrition<DirectoryVoictent>({
    gepp: DIRECTORY_GEPP,
  })
  .toGrition<SubgraphToGraphRelationshipVoictent>({
    gepp: SUBGRAPH_TO_GRAPH_RELATIONSHIP_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((directory) => {
    return {
      parentId: ROOT_DIRECTED_GRAPH_ATTRIBUTE_BY_KEY.id,
      childId: directory.instanceId,
    };
  })
  .assemble();
