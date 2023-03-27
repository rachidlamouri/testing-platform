import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  DirectedGraphVoictent,
  DIRECTED_GRAPH_GEPP,
} from './directed-graph/directedGraph';
import { getGraphvizCode } from './directed-graph/getGraphvizCode';
import { GraphvizCodeVoictent, GRAPHVIZ_CODE_GEPP } from './graphvizCode';

export const encodeDirectedGraphAsGraphvizCode = buildEstinant()
  .fromGrition<DirectedGraphVoictent>({
    gepp: DIRECTED_GRAPH_GEPP,
  })
  .toGrition<GraphvizCodeVoictent>({
    gepp: GRAPHVIZ_CODE_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((input) => {
    const code = getGraphvizCode(input);
    return code;
  })
  .assemble();
