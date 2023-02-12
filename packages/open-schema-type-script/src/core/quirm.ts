import { Dalph } from '../utilities/dalph';
import { GeppTuple } from './gepp';
import { Hubblepup } from './hubblepup';

/**
 * One of the two programmable units of the Engine (see Estinant). It allows the Concrete Programmer to register
 * a Hubblepup to zero or more Voictents via Gepps.
 *
 * Note: I currently don't have a use case for defining zero Gepps, but that's irrelevent to the Engine
 */
export type Quirm<
  THubblepup extends Hubblepup = Hubblepup,
  TGeppTuple extends GeppTuple = GeppTuple,
> = {
  geppTuple: TGeppTuple;
  hubblepup: THubblepup;
};

export type QuirmTuple<THubblepup extends Hubblepup = Hubblepup> =
  readonly Quirm<THubblepup>[];

export type QuirmTupleToGeppTuple<TQuirmTuple extends QuirmTuple> = {
  [Index in keyof TQuirmTuple]: TQuirmTuple[Index]['geppTuple'][number];
};

/**
 * A Quirm that is not meant to be used. This is used in the definition of a Kodataring
 */
export type QuirmDalph = Quirm<Dalph, GeppTuple>;
