import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../../package-agnostic-utilities/data-structure/id';
import { BaseDirectedGraphConstituentIdInput } from './baseDirectedGraphConstituentIdInput';

const DIRECTED_CLUSTER_ID_TEMPLATE = [
  ['graphElement', ['cluster']],
  ['source', ComplexId.AnyComplexId],
  'distinguisher',
] as const satisfies GenericComplexIdTemplate;
type DirectedClusterIdTemplate = typeof DIRECTED_CLUSTER_ID_TEMPLATE;

type DirectedClusterIdInput = BaseDirectedGraphConstituentIdInput;

/**
 * See name
 */
export class DirectedClusterId extends ComplexId<DirectedClusterIdTemplate> {
  constructor({ source, distinguisher }: DirectedClusterIdInput) {
    super({
      graphElement: 'cluster',
      source,
      distinguisher,
    });
  }

  get rawTemplate(): DirectedClusterIdTemplate {
    return DIRECTED_CLUSTER_ID_TEMPLATE;
  }
}
