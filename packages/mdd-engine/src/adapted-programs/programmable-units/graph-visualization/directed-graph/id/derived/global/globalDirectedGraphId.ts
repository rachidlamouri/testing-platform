import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../../../../package-agnostic-utilities/data-structure/id';
import { DirectedGraphId } from '../../directedGraphId';

const GLOBAL_DIRECTED_GRAPH_ID_TEMPLATE = [
  ['graph', DirectedGraphId],
  ['local', ['']],
] as const satisfies GenericComplexIdTemplate;
type GlobalDirectedGraphIdTemplate = typeof GLOBAL_DIRECTED_GRAPH_ID_TEMPLATE;

export class GlobalDirectedGraphId extends ComplexId<GlobalDirectedGraphIdTemplate> {
  get rawTemplate(): GlobalDirectedGraphIdTemplate {
    return GLOBAL_DIRECTED_GRAPH_ID_TEMPLATE;
  }
}
