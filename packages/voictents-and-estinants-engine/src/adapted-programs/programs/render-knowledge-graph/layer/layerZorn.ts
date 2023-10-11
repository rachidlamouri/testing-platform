import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';

const LAYER_ZORN_TEMPLATE = [
  'directoryPath',
  'displayName',
] as const satisfies GenericComplexIdTemplate;
type LayerZornTemplate = typeof LAYER_ZORN_TEMPLATE;

/**
 * The complex identifier of a Layer
 *
 * @readableName LayerComplexId
 */
export class LayerZorn extends ComplexId<LayerZornTemplate> {
  get rawTemplate(): LayerZornTemplate {
    return LAYER_ZORN_TEMPLATE;
  }
}
