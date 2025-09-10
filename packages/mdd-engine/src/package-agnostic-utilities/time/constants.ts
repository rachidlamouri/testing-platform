/**
 * Encapsulates time semantics and conversion rates
 *
 * @noCanonicalDeclaration
 */

import { Milliseconds } from './milliseconds';
import { Nanoseconds } from './nanoseconds';

export const NANOSECONDS_PER_SECOND = new Nanoseconds(1_000_000_000n);
export const NANOSECONDS_PER_MILLISECOND = new Nanoseconds(1_000_000n);

export const MILLISECONDS_PER_SECOND = new Milliseconds(1_000n);
