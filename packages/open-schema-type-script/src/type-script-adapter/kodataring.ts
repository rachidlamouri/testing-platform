import * as uuid from 'uuid';
import { Croarder } from '../core/croarder';
import { Dalph } from '../utilities/dalph';
import { Struss } from '../utilities/struss';

/**
 * A Croarder that always returns something unique, regardless of the input
 */
export type Kodataring = Croarder<Dalph, Struss>;

/**
 * A Croarder that always returns something unique, regardless of the input
 *
 * @returns something unique
 */
export const kodatar: Kodataring = () => Symbol(uuid.v4());
