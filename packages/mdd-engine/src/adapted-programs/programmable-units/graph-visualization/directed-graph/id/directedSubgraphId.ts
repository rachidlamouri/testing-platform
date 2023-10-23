import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../../package-agnostic-utilities/data-structure/id';
import { BaseDirectedGraphConstituentIdInput } from './baseDirectedGraphConstituentIdInput';

const DIRECTED_SUBGRAPH_ID_TEMPLATE = [
  ['graphElement', ['subgraph']],
  ['source', ComplexId.AnyComplexId],
  'distinguisher',
] as const satisfies GenericComplexIdTemplate;
type DirectedSubgraphIdTemplate = typeof DIRECTED_SUBGRAPH_ID_TEMPLATE;

type DirectedSubgraphIdInput = BaseDirectedGraphConstituentIdInput;

export class DirectedSubgraphId extends ComplexId<DirectedSubgraphIdTemplate> {
  constructor({ source, distinguisher }: DirectedSubgraphIdInput) {
    super({
      graphElement: 'subgraph',
      source,
      distinguisher,
    });
  }

  get rawTemplate(): DirectedSubgraphIdTemplate {
    return DIRECTED_SUBGRAPH_ID_TEMPLATE;
  }
}
