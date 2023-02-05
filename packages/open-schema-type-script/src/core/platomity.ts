import { Estinant } from './estinant';
import { Lanbe } from './lanbe';
import { Quirm } from './quirm';

/**
 * The primary thing that the engine operates on in the main loop.
 * The Lanbe allows the Engine to resolve Quirms, and subsequently Hubblepups, to be sent to the Tropoignant that is saved to the Estinant.
 */
export type Platomity = {
  estinant: Estinant;
  lanbe: Lanbe<Quirm>;
};
