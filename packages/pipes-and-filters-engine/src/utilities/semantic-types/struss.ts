import * as uuid from 'uuid';

/**
 * This is for references that are meant to be unique.
 */
export type Struss = symbol;

export const buildStruss = (): Struss => Symbol(uuid.v4());
