import { DreanorTuple } from './dreanor';
import { Estinant, Estinant2 } from './estinant';
import { Lanbe } from './lanbe';
import { Procody } from './procody';
import { Quirm } from './quirm';

/**
 * The primary thing that the engine operates on in the main loop.
 * The Lanbe allows the Engine to resolve Quirms, and subsequently Hubblepups, to be sent to the Tropoignant that is saved to the Estinant.
 */
export type Platomity = {
  estinant: Estinant;
  lanbe: Lanbe<Quirm>;
};

/**
 * The primary thing that the engine operates on in the main loop.
 * The Lanbe allows the Engine to resolve Quirms, and subsequently Hubblepups, to be sent to the Tropoignant that is saved to the Estinant.
 */
export type Platomity2 = {
  estinant: Estinant2;
  dreanorTuple: DreanorTuple;
  procody: Procody;
};
