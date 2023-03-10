import * as uuid from 'uuid';

/**
 * This is for references that are meant to be unique.
 */
export type Struss = string;

export const buildStruss = (): Struss => uuid.v4();
