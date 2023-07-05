import { posix } from 'path';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { BOUNDARY_TRIE_A_GEPP, BoundaryTrieAVoque } from './boundaryTrieA';
import {
  BoundaryTrieBVoque,
  BOUNDARY_TRIE_B_GEPP,
  BoundaryTrieB,
} from './boundaryTrieB';
import { hasOneElement } from '../../../../utilities/hasOneElement';

/**
 * Constructs a second boundary trie data structure out of only the valid
 * portions of the trie
 */
export const getBoundaryTrieB = buildEstinant({
  name: 'getBoundaryTrieB',
})
  .fromHubblepup2<BoundaryTrieAVoque>({
    gepp: BOUNDARY_TRIE_A_GEPP,
  })
  .toHubblepup2<BoundaryTrieBVoque>({
    gepp: BOUNDARY_TRIE_B_GEPP,
  })
  .onPinbe((trieA) => {
    const trieB = new BoundaryTrieB(null);
    trieA
      .flatten()
      .map((subtrie) => subtrie.value)
      .filter(hasOneElement)
      .forEach(([boundary]) => {
        // TODO: move path parsing elsewhere
        const pathPartList = boundary.directoryPath.split(posix.sep);

        trieB.addSubtrie(
          pathPartList,
          () => new BoundaryTrieB(null),
          () => {
            return boundary;
          },
        );
      });

    return trieB;
  })
  .assemble();
