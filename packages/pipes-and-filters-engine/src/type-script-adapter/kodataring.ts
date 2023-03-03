import { Croarder } from './croarder';
import { buildStruss, Struss } from '../utilities/semantic-types/struss';
import { VoictentTuple } from './voictent';
import { Dalph } from '../utilities/semantic-types/dalph';

/**
 * A Croarder that always returns something unique, regardless of the input
 */
export type Kodataring = Croarder<Dalph<VoictentTuple>, Struss>;

/**
 * A Croarder that always returns something unique, regardless of the input
 *
 * @returns something unique
 */
export const kodatar: Kodataring = buildStruss;
