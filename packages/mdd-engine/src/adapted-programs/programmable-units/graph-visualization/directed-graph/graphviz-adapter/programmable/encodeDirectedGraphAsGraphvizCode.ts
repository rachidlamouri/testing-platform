import { buildProgrammedTransform } from '../../../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  DIRECTED_GRAPH_ELEMENT_GROUP_COLLECTION_ID,
  DirectedGraphElementGroupStreamMetatype,
} from '../../element-group/directedGraphElementGroup';
import { buildGraphvizDirectedGraph } from '../buildGraphvizDirectedGraph';
import {
  GRAPHVIZ_CODE_COLLECTION_ID,
  GraphvizCode,
  GraphvizCodeStreamMetatype,
} from './graphvizCode';

/**
 * Converts a custom DirectedGraph object into Graphviz code
 */
export const encodeDirectedGraphAsGraphvizCode = buildProgrammedTransform({
  name: 'encodeDirectedGraphAsGraphvizCode',
})
  .fromItem2<DirectedGraphElementGroupStreamMetatype>({
    collectionId: DIRECTED_GRAPH_ELEMENT_GROUP_COLLECTION_ID,
  })
  .toItem2<GraphvizCodeStreamMetatype>({
    collectionId: GRAPHVIZ_CODE_COLLECTION_ID,
  })
  .onTransform((group) => {
    const graphvizDirectedGraph = buildGraphvizDirectedGraph(group);
    const code = graphvizDirectedGraph.getCode();

    return new GraphvizCode({
      graph: group.directedGraph,
      code,
    });
  })
  .assemble();
