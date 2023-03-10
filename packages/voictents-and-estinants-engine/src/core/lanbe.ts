import { Hubblepup, HubblepupTuple } from './hubblepup';

type BaseLanbe<TOutput extends Hubblepup | HubblepupTuple> = {
  debugName: string;
  hasNext: () => boolean;
  advance: () => void;
  dereference: () => TOutput | null;
};

export type VoictentItemLanbe = BaseLanbe<Hubblepup>;

export type VoictentLanbe = BaseLanbe<HubblepupTuple>;

/**
 * A data structure that facilitates streaming Hubblepups from a voictent or the entire tuple from the Voictent at once.
 * It encapsulates stream operations on a Voictent.
 * This allows an external entity to read a Voictent without needing a direct reference to it.
 */
export type Lanbe = VoictentItemLanbe | VoictentLanbe;
