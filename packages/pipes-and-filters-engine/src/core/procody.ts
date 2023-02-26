import { Cology } from './cology';
import { Zorn } from '../utilities/semantic-types/zorn';

/**
 * Cologies cached by Zorns. This is stored in a Platomity.
 * The Engine finds a Cology where every item cached in the Cology resolves to the same Zorn
 */
export class Procody extends Map<Zorn, Cology> {}
