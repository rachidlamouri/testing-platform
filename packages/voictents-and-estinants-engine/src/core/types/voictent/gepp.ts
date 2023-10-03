import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { Combination } from '../../../package-agnostic-utilities/type/combination';

/**
 * Enables identifying an instantiated collection.
 *
 * @readableName CollectionId
 */
export type Gepp = string;

export type GeppTuple = Tuple<Gepp>;

export type GeppSet = Set<Gepp>;

export type GeppCombination<TGepp extends Gepp> = Combination<TGepp>;

export type GenericGeppCombination = GeppCombination<Gepp>;
