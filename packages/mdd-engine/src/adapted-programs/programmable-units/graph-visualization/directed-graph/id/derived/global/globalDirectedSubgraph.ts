import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../../../../package-agnostic-utilities/data-structure/id';
import { DirectedGraphId } from '../../directedGraphId';
import { DirectedSubgraphId } from '../../directedSubgraphId';

const GLOBAL_DIRECTED_SUBGRAPH_ID_TEMPLATE = [
  ['graph', DirectedGraphId],
  ['local', DirectedSubgraphId],
] as const satisfies GenericComplexIdTemplate;
type GlobalDirectedSubgraphIdTemplate =
  typeof GLOBAL_DIRECTED_SUBGRAPH_ID_TEMPLATE;

export class GlobalDirectedSubgraphId extends ComplexId<GlobalDirectedSubgraphIdTemplate> {
  get rawTemplate(): GlobalDirectedSubgraphIdTemplate {
    return GLOBAL_DIRECTED_SUBGRAPH_ID_TEMPLATE;
  }
}
