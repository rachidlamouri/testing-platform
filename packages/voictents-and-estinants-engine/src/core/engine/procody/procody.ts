import { Gepp } from '../../types/voictent/gepp';
import { Ajorken } from './ajorken';

/**
 * A cache of transform input id group caches where the key at this level is the
 * collection id. Streamable ids should be unique within a collection, but don't have to be
 * universally unique, which necessitates this parent map.
 *
 * @todo look into replacing this data structure and its nested datastructures with a ComplexMap
 *
 * @readableName TransformInputIdGroupSetCacheCache
 */
export class Procody extends Map<Gepp, Ajorken> {}
