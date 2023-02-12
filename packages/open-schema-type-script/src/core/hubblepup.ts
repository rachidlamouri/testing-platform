import { Straline } from './straline';

/**
 * A thing that a Concrete Programmer wants to operate on.
 * I'm aware that this does not need to be a generic type, but it helps with semantics.
 */
export type Hubblepup<THubblepup = Straline> = THubblepup;

export type HubblepupTuple<THubblepup = Straline> =
  readonly Hubblepup<THubblepup>[];
