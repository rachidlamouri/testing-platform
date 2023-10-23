import {
  GenericComplexIdTemplate,
  ComplexId,
  InputValueByTemplateKey,
} from '../../../../../package-agnostic-utilities/data-structure/id';

const DIRECTED_GRAPH_ID_TEMPLATE = [
  ['graphElement', ['graph']],
  ['source', ComplexId.AnyComplexId],
  'distinguisher',
] as const satisfies GenericComplexIdTemplate;
type DirectedGraphIdTemplate = typeof DIRECTED_GRAPH_ID_TEMPLATE;

type DirectedGraphIdInput = Pick<
  InputValueByTemplateKey<DirectedGraphIdTemplate>,
  'source' | 'distinguisher'
>;

/**
 * See name
 */
export class DirectedGraphId extends ComplexId<DirectedGraphIdTemplate> {
  constructor({ source, distinguisher }: DirectedGraphIdInput) {
    super({
      graphElement: 'graph',
      source,
      distinguisher,
    });
  }

  get rawTemplate(): DirectedGraphIdTemplate {
    return DIRECTED_GRAPH_ID_TEMPLATE;
  }
}
