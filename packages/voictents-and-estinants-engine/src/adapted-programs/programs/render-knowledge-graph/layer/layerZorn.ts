import {
  GenericComplexzornTemplate,
  Complexzorn,
} from '../../../../package-agnostic-utilities/datastructure/zorn';

const LAYER_ZORN_TEMPLATE = [
  'directoryPath',
  'displayName',
] as const satisfies GenericComplexzornTemplate;
type LayerZornTemplate = typeof LAYER_ZORN_TEMPLATE;

/**
 * The complex identifier of a Layer
 *
 * @readableName LayerComplexId
 */
export class LayerZorn extends Complexzorn<LayerZornTemplate> {
  get rawTemplate(): LayerZornTemplate {
    return LAYER_ZORN_TEMPLATE;
  }
}
