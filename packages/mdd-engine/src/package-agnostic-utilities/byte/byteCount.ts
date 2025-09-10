import { Integer } from '../integer/integer';

/**
 * Enforces that a count of bytes is an integer. Count in bits if you need a
 * fraction of bytes.
 */
export class ByteCount extends Integer<number> {}
