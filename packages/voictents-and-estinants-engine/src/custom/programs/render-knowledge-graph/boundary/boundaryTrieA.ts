import { StandardInMemoryVoque } from '../../../../core/engine/inMemoryVoque';
import { Trie } from '../../../../utilities/trie';
import { Boundary } from './boundary';

/**
 * A boundary trie where nodes are always a list of zero or more boundaries.
 * This lets us handle duplicates without having to error check right away
 */
export class BoundaryTrieA extends Trie<Boundary[]> {}

export const BOUNDARY_TRIE_A_GEPP = 'boundary-trie-a';

type BoundaryTrieAGepp = typeof BOUNDARY_TRIE_A_GEPP;

export type BoundaryTrieAVoque = StandardInMemoryVoque<
  BoundaryTrieAGepp,
  BoundaryTrieA
>;
