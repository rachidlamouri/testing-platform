import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { GRAPHVIZ_CODE_GEPP, GraphvizCodeVoque } from './graphvizCode';
import {
  DIRECTED_GRAPH_COLLECTION_ID,
  DirectedGraphStreamMetatype,
} from './directed-graph/directedGraph';
import { getGraphvizCode } from './directed-graph/getGraphvizCode';

/**
 * Converts a directed graph data structure into Graphviz code.
 */
export const encodeDirectedGraphAsGraphvizCode = buildProgrammedTransform({
  name: 'encodeDirectedGraphAsGraphvizCode',
})
  .fromItem2<DirectedGraphStreamMetatype>({
    collectionId: DIRECTED_GRAPH_COLLECTION_ID,
  })
  .toItem2<GraphvizCodeVoque>({
    collectionId: GRAPHVIZ_CODE_GEPP,
  })
  .onTransform((input) => {
    const code = getGraphvizCode(input);
    return {
      zorn: input.id,
      grition: code,
    };
  })
  .assemble();
