import { Croarder } from './croarder';
import { GeppTuple } from './gepp';
import { Tropoignant } from './tropoignant';

/**
 * One of the two programmable units of the Engine (see Quirm).
 * It allows the Progammer to register a Tropoignant to one or more Voictents via a tuple of Gepps.
 */
export type Estinant = {
  inputGeppTuple: GeppTuple;
  croard: Croarder;
  tropoig: Tropoignant;
};

export type EstinantTuple = readonly Estinant[];
