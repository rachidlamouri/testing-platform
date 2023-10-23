import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../../package-agnostic-utilities/data-structure/id';
import { SpreadN } from '../../../../../package-agnostic-utilities/type/spreadN';
import { BaseDirectedGraphConstituentIdInput } from './baseDirectedGraphConstituentIdInput';
import { DirectedGraphNodeId } from './directedGraphNodeId';

const DIRECTED_EDGE_ID_TEMPLATE = [
  ['graphElement', ['edge']],
  ['tail', DirectedGraphNodeId],
  ['head', DirectedGraphNodeId],
  ['source', ComplexId.AnyComplexId],
  'distinguisher',
] as const satisfies GenericComplexIdTemplate;
type DirectedEdgeIdTemplate = typeof DIRECTED_EDGE_ID_TEMPLATE;

type DirectedEdgeIdInput = SpreadN<
  [
    {
      tailId: DirectedGraphNodeId;
      headId: DirectedGraphNodeId;
    },
    BaseDirectedGraphConstituentIdInput,
  ]
>;

/**
 * See name
 */
export class DirectedEdgeId extends ComplexId<DirectedEdgeIdTemplate> {
  constructor({ tailId, headId, source, distinguisher }: DirectedEdgeIdInput) {
    super({
      graphElement: 'edge',
      tail: tailId,
      head: headId,
      source,
      distinguisher,
    });
  }

  get rawTemplate(): DirectedEdgeIdTemplate {
    return DIRECTED_EDGE_ID_TEMPLATE;
  }
}
