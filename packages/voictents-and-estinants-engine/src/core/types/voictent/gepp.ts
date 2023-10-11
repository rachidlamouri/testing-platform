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

export type GeppTuple = Tuple<CollectionId>;

export type GeppSet = Set<CollectionId>;

export type GeppCombination<TGepp extends CollectionId> = Combination<TGepp>;

export type GenericGeppCombination = GeppCombination<CollectionId>;
