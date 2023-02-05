import { Gipp } from './gipp';
import { Tropoignant } from './tropoignant';

/**
 * One of the two programmable units of the Engine (see Quirm).
 * It allows the Progammer to register a Tropoignant to a Voictent via a Gipp.
 */
export type Estinant = {
  tropoignant: Tropoignant;
  inputGipp: Gipp;
};
