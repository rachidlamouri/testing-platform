import {
  Straline,
  StralineObject,
} from '../../utilities/semantic-types/straline';

/**
 * The thing that a Concrete Programmer wants to operate on, but it is part of an Odeshin, which also contains an identifier.
 * Therefore, it is like a Hubblepup, but it is a property of a special type of Hubblepup
 */
export type Grition<TGrition extends Straline = Straline> = TGrition;

export type GritionTuple = readonly Grition[];
