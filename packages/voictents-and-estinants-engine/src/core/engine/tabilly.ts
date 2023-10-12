import { CollectionId } from '../types/collection/collectionId';
import { GenericCollection2 } from '../types/collection/collection2';

/**
 * A cache of collections by collection id.
 *
 * @readableName CollectionCache
 */
export class Tabilly extends Map<CollectionId, GenericCollection2> {}
