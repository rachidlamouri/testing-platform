/**
 * Source of truth for byte counts by prefix
 *
 * @noCanonicalDeclaration
 */

import { Integer } from '../integer/integer';

export const BYTES_PER_GIGABYTE = new Integer(1_000_000_000 as const);
export const BYTES_PER_MEGABYTE = new Integer(1_000_000 as const);
export const BYTES_PER_KILOBYTE = new Integer(1_000 as const);
export const BYTES_PER_BYTE = new Integer(1 as const);
