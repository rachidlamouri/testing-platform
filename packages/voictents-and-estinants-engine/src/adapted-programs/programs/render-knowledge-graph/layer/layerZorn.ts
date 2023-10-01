import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../package-agnostic-utilities/datastructure/zorn';

const LAYER_ZORN_TEMPLATE = [
  'directoryPath',
  'displayName',
] as const satisfies GenericZorn2Template;
type LayerZornTemplate = typeof LAYER_ZORN_TEMPLATE;

/**
 * The complex identifier of a Layer
 */
export class LayerZorn extends Zorn2<LayerZornTemplate> {
  get rawTemplate(): LayerZornTemplate {
    return LAYER_ZORN_TEMPLATE;
  }
}
