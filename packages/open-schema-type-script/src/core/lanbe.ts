import { NullStraline } from './straline';

/**
 * A data structure that encapsulates pointer operations on a Voictent.
 * This allows an external entity to consume a Voictent without needing a direct reference to it.
 */
export type Lanbe<TStraline> = {
  pointer: symbol;
  /**
   * @returns Whether the pointer can advance or not
   */
  canAdvance: () => boolean;
  /**
   * @modifies the index of the pointer within the Voictent by incrementing it
   */
  advance: () => void;
  /**
   * @returns the Straline at the current index of the pointer within the Voictent
   */
  dereference: () => TStraline | NullStraline;
};
