import { Gipp } from './gipp';
import { Hubblepup } from './hubblepup';

/**
 * One of the two programmable units of the Engine (see Estinant). It allows the Concrete Programmer to register
 * a Hubblepup to zero or more Voictents via Gipps.
 *
 * Note: I currently don't have a use case for defining zero Gipps, but that's irrelevent to the Engine
 */
export type Quirm<THubblepup extends Hubblepup = Hubblepup> = {
  gippTuple: Gipp[];
  hubblepup: THubblepup;
};

export type QuirmTuple<THubblepup extends Hubblepup = Hubblepup> =
  readonly Quirm<THubblepup>[];
