import { Gipp } from './gipp';
import { Tropoignant } from './tropoignant';

/**
 * The thing that allows the engine to connect a Tropoignant to a Voictent
 */
export type Estinant = {
  tropoignant: Tropoignant;
  inputGipp: Gipp;
};
