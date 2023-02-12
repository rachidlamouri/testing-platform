import * as uuid from 'uuid';
import { Croarder } from '../core/croarder';
import { QuirmDalph } from '../core/quirm';
import { Struss } from '../utilities/struss';

/**
 * A Croarder that always returns something unique, regardless of the input
 */
export type Kodataring = Croarder<QuirmDalph, Struss>;

/**
 * A Croarder that always returns something unique, regardless of the input
 *
 * @returns something unique
 */
export const kodatar: Kodataring = () => Symbol(uuid.v4());
