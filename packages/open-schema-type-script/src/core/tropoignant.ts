import { Hubblepup } from './hubblepup';

/**
 * A Tropoignant that creates an output Hubblepup for every input Hubblepup
 */
export type Onama = (input: Hubblepup) => Hubblepup;

/**
 * The thing that a programmer creates to process a Hubblepup. The engine manages them at runtime.
 */
export type Tropoignant = Onama;
