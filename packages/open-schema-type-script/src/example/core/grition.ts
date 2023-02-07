import { JsonObject } from '../../utilities/json';

/**
 * A thing that an Abstract Programmer wants to operate on.
 * It has the same base definition as a Hubblepup, but it is part of an Odeshin, which is a Hubblepup
 */
export type Grition<TGrition extends JsonObject = JsonObject> = TGrition;
