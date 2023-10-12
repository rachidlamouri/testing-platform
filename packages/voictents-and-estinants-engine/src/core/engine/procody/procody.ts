import { CollectionId } from '../../types/collection/collectionId';
import { Ajorken } from './ajorken';

/**
 * A cache of transform input key group caches where the key at this level is the
 * collection id. Item keys should be unique within a collection, but don't have to be
 * universally unique, which necessitates this parent map.
 *
 * @todo look into replacing this data structure and its nested datastructures with a ComplexMap
 *
 * @readableName TransformInputKeyGroupSetCacheCache
 */
export class Procody extends Map<CollectionId, Ajorken> {}
