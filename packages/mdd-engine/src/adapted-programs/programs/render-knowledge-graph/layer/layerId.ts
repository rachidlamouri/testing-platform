import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';

const LAYER_ID_TEMPLATE = [
  'directoryPath',
  'displayName',
] as const satisfies GenericComplexIdTemplate;
type LayerIdTemplate = typeof LAYER_ID_TEMPLATE;

/**
 * The complex identifier of a Layer
 *
 * @readableName LayerComplexId
 */
export class LayerId extends ComplexId<LayerIdTemplate> {
  get rawTemplate(): LayerIdTemplate {
    return LAYER_ID_TEMPLATE;
  }
}
