import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../../../../package-agnostic-utilities/data-structure/id';
import { DirectedGraphId } from '../../directedGraphId';
import { DirectedGraphNodeId } from '../../directedGraphNodeId';

const GLOBAL_DIRECTED_GRAPH_NODE_ID_TEMPLATE = [
  ['graph', DirectedGraphId],
  ['local', DirectedGraphNodeId],
] as const satisfies GenericComplexIdTemplate;
type GlobalDirectedGraphNodeIdTemplate =
  typeof GLOBAL_DIRECTED_GRAPH_NODE_ID_TEMPLATE;

export class GlobalDirectedGraphNodeId extends ComplexId<GlobalDirectedGraphNodeIdTemplate> {
  get rawTemplate(): GlobalDirectedGraphNodeIdTemplate {
    return GLOBAL_DIRECTED_GRAPH_NODE_ID_TEMPLATE;
  }
}
