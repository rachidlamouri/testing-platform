import { Tuple } from '../../../utilities/semantic-types/tuple';
import { Combination } from '../../../utilities/semantic-types/combination';

/**
 * The thing that is used to find a Voictent of Hubblepups
 */
export type Gepp = string;

export type GeppTuple = Tuple<Gepp>;

export type GeppSet = Set<Gepp>;

export type GeppCombination<TGepp extends Gepp> = Combination<TGepp>;

export type GenericGeppCombination = GeppCombination<Gepp>;
