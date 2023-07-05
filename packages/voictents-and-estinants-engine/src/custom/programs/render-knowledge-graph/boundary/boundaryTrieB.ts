import { StandardInMemoryVoque } from '../../../../core/engine/inMemoryVoque';
import { Trie } from '../../../../utilities/trie';
import { Boundary } from './boundary';

/**
 * A boundary trie where nodes are either a single boundary or null
 */
export class BoundaryTrieB extends Trie<Boundary | null> {}

export const BOUNDARY_TRIE_B_GEPP = 'boundary-trie-b';

type BoundaryTrieBGepp = typeof BOUNDARY_TRIE_B_GEPP;

export type BoundaryTrieBVoque = StandardInMemoryVoque<
  BoundaryTrieBGepp,
  BoundaryTrieB
>;
