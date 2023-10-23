import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../../../../package-agnostic-utilities/data-structure/id';
import { DirectedClusterId } from '../../directedClusterId';
import { DirectedGraphId } from '../../directedGraphId';

const GLOBAL_DIRECTED_CLUSTER_ID_TEMPLATE = [
  ['graph', DirectedGraphId],
  ['local', DirectedClusterId],
] as const satisfies GenericComplexIdTemplate;
type GlobalDirectedClusterIdTemplate =
  typeof GLOBAL_DIRECTED_CLUSTER_ID_TEMPLATE;

export class GlobalDirectedClusterId extends ComplexId<GlobalDirectedClusterIdTemplate> {
  get rawTemplate(): GlobalDirectedClusterIdTemplate {
    return GLOBAL_DIRECTED_CLUSTER_ID_TEMPLATE;
  }
}
