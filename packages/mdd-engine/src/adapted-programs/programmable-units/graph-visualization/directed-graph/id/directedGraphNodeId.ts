import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../../package-agnostic-utilities/data-structure/id';
import { BaseDirectedGraphConstituentIdInput } from './baseDirectedGraphConstituentIdInput';

const DIRECTED_GRAPH_NODE_ID_TEMPLATE = [
  ['graphElement', ['node']],
  ['source', ComplexId.AnyComplexId],
  'distinguisher',
] as const satisfies GenericComplexIdTemplate;
type DirectedGraphNodeIdTemplate = typeof DIRECTED_GRAPH_NODE_ID_TEMPLATE;

type DirectedGraphNodeIdInput = BaseDirectedGraphConstituentIdInput;

/**
 * See name
 */
export class DirectedGraphNodeId extends ComplexId<DirectedGraphNodeIdTemplate> {
  constructor({ source, distinguisher }: DirectedGraphNodeIdInput) {
    super({
      graphElement: 'node',
      source,
      distinguisher,
    });
  }

  get rawTemplate(): DirectedGraphNodeIdTemplate {
    return DIRECTED_GRAPH_NODE_ID_TEMPLATE;
  }
}
