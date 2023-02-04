import { Estinant } from './estinant';
import { Lanbe } from './lanbe';
import { Quirm } from './quirm';

/**
 * A thing that the engine uses to stream Hubblepups (via a Voictent of Quirms) into a Tropoignant (via an Estinant)
 */
export type Platomity = {
  estinant: Estinant;
  lanbe: Lanbe<Quirm>;
};
