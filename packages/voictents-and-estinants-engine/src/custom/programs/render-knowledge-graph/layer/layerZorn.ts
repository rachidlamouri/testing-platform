import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';

const LAYER_ZORN_TEMPLATE = [
  'directoryPath',
  'displayName',
] as const satisfies GenericZorn2Template;
type LayerZornTemplate = typeof LAYER_ZORN_TEMPLATE;
export class LayerZorn extends Zorn2<LayerZornTemplate> {
  get rawTemplate(): LayerZornTemplate {
    return LAYER_ZORN_TEMPLATE;
  }
}
