import { Hubblepup } from './hubblepup';

/**
 * A data structure that facilitates streaming Hubblepups from a voictent.
 * It encapsulates stream operations on a Voictent.
 * This allows an external entity to read a Voictent without needing a direct reference to it.
 */
export type Lanbe = {
  debugName: string;
  hasNext: () => boolean;
  advance: () => void;
  dereference: () => Hubblepup | null;
};
