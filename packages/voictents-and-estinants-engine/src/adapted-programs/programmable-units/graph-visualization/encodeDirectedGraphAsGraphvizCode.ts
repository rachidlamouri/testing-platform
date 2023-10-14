import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { GRAPHVIZ_CODE_GEPP, GraphvizCodeVoque } from './graphvizCode';
import {
  DIRECTED_GRAPH_GEPP,
  DirectedGraphVoque,
} from './directed-graph/directedGraph';
import { getGraphvizCode } from './directed-graph/getGraphvizCode';

/**
 * Converts a directed graph data structure into Graphviz code.
 */
export const encodeDirectedGraphAsGraphvizCode = buildProgrammedTransform({
  name: 'encodeDirectedGraphAsGraphvizCode',
})
  .fromItem2<DirectedGraphVoque>({
    collectionId: DIRECTED_GRAPH_GEPP,
  })
  .toItem2<GraphvizCodeVoque>({
    collectionId: GRAPHVIZ_CODE_GEPP,
  })
  .onTransform((input) => {
    const code = getGraphvizCode(input);
    return {
      zorn: input.zorn,
      grition: code,
    };
  })
  .assemble();
