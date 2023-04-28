import { Straline } from '../../../utilities/semantic-types/straline';

/**
 * A thing that a Concrete Programmer wants to operate on
 */
export type Hubblepup = unknown;

export type HubblepupTuple = readonly Hubblepup[];

export type IndexedHubblepup<
  THubblepup extends Hubblepup,
  TIndex extends Straline,
> = {
  hubblepup: THubblepup;
  index: TIndex;
};

export type GenericIndexedHubblepup = IndexedHubblepup<Hubblepup, Straline>;
