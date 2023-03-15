import { buildOnama } from '../../adapter/estinant/onama';
import {
  DirectedGraphVoictent,
  DIRECTED_GRAPH_GEPP,
} from './directed-graph/directedGraph';
import { getGraphvizCode } from './directed-graph/getGraphvizCode';
import { GraphvizCodeVoictent, GRAPHVIZ_CODE_GEPP } from './graphvizCode';

export const directedGraphToGraphvizCode = buildOnama<
  DirectedGraphVoictent,
  GraphvizCodeVoictent
>({
  inputGepp: DIRECTED_GRAPH_GEPP,
  outputGepp: GRAPHVIZ_CODE_GEPP,
  pinbe: (input) => {
    const code = getGraphvizCode(input);
    return code;
  },
});
