import { PartialSubgraphAttributeByKey } from '../../graph-visualization/directed-graph/directedGraph';
import { BOUNDARY_FONT_SIZE } from './commonAttributeByKey';
import { ROOT_DIRECTED_GRAPH_ATTRIBUTE_BY_KEY } from './rootDirectedGraph';
import { SubgraphToGraphRelationship } from './subgraphToGraphRelationship';

export const EXTERNAL_BOUNDARY_SUBGRAPH_ATTRIBUTE_BY_KEY = {
  id: 'ad114847-8774-41bd-af5d-02fc554512a0',
  label: 'External Modules',
  fontsize: BOUNDARY_FONT_SIZE,
} satisfies PartialSubgraphAttributeByKey;

export const EXTERNAL_BOUNDARY_SUBGRAPH_TO_GRAPH_RELATIONSHIP: SubgraphToGraphRelationship =
  {
    parentId: ROOT_DIRECTED_GRAPH_ATTRIBUTE_BY_KEY.id,
    childId: EXTERNAL_BOUNDARY_SUBGRAPH_ATTRIBUTE_BY_KEY.id,
  };
