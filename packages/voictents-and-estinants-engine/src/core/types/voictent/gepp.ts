import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { Combination } from '../../../package-agnostic-utilities/type/combination';

/**
 * The thing that is used to find a Voictent of Hubblepups
 */
export type Gepp = string;

export type GeppTuple = Tuple<Gepp>;

export type GeppSet = Set<Gepp>;

export type GeppCombination<TGepp extends Gepp> = Combination<TGepp>;

export type GenericGeppCombination = GeppCombination<Gepp>;
