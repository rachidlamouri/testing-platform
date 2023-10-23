import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../../../../package-agnostic-utilities/data-structure/id';
import { DirectedEdgeId } from '../../directedEdgeId';
import { DirectedGraphId } from '../../directedGraphId';

const GLOBAL_DIRECTED_EDGE_ID_TEMPLATE = [
  ['graph', DirectedGraphId],
  ['local', DirectedEdgeId],
] as const satisfies GenericComplexIdTemplate;
type GlobalDirectedEdgeIdTemplate = typeof GLOBAL_DIRECTED_EDGE_ID_TEMPLATE;

export class GlobalDirectedEdgeId extends ComplexId<GlobalDirectedEdgeIdTemplate> {
  get rawTemplate(): GlobalDirectedEdgeIdTemplate {
    return GLOBAL_DIRECTED_EDGE_ID_TEMPLATE;
  }
}
