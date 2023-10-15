import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { Combination } from '../../../package-agnostic-utilities/type/combination';

/**
 * Enables identifying an instantiated collection.
 *
 * @readableName CollectionId
 *
 * @canonicalDeclaration
 */
export type CollectionId = string;

export type CollectionIdTuple = Tuple<CollectionId>;

export type CollectionIdSet = Set<CollectionId>;

export type CollectionIdCombination<TCollectionId extends CollectionId> =
  Combination<TCollectionId>;

export type GenericCollectionIdCombination =
  CollectionIdCombination<CollectionId>;
