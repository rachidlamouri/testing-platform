import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { GRAPHVIZ_CODE_GEPP, GraphvizCodeVoque } from './graphvizCode';
import {
  DIRECTED_GRAPH_GEPP,
  DirectedGraphVoque,
} from './directed-graph/directedGraph';
import { getGraphvizCode } from './directed-graph/getGraphvizCode';

/**
 * Converts a directed graph data structure into Graphviz code.
 */
export const encodeDirectedGraphAsGraphvizCode = buildEstinant({
  name: 'encodeDirectedGraphAsGraphvizCode',
})
  .fromHubblepup2<DirectedGraphVoque>({
    gepp: DIRECTED_GRAPH_GEPP,
  })
  .toHubblepup2<GraphvizCodeVoque>({
    gepp: GRAPHVIZ_CODE_GEPP,
  })
  .onPinbe((input) => {
    const code = getGraphvizCode(input);
    return {
      zorn: input.zorn,
      grition: code,
    };
  })
  .assemble();
