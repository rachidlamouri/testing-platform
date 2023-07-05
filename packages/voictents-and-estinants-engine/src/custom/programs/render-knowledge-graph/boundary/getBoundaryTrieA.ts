import { posix } from 'path';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { BOUNDARY_GEPP, BoundaryVoque } from './boundary';
import {
  BOUNDARY_TRIE_A_GEPP,
  BoundaryTrieA,
  BoundaryTrieAVoque,
} from './boundaryTrieA';

/**
 * Gathers boundaries into a trie data structure by their directory paths
 * without checking for duplicates
 */
export const getBoundaryTrieA = buildEstinant({
  name: 'getBoundaryTrieA',
})
  .fromVoictent2<BoundaryVoque>({
    gepp: BOUNDARY_GEPP,
  })
  .toHubblepup2<BoundaryTrieAVoque>({
    gepp: BOUNDARY_TRIE_A_GEPP,
  })
  .onPinbe((boundaryList) => {
    const trieA = new BoundaryTrieA([]);

    boundaryList.forEach((boundary) => {
      const pathPartList = boundary.directoryPath.split(posix.sep);

      trieA.addSubtrie(
        pathPartList,
        () => {
          return new BoundaryTrieA([]);
        },
        (boundaryListAtPath) => {
          boundaryListAtPath.push(boundary);
          return boundaryListAtPath;
        },
      );
    });

    return trieA;
  })
  .assemble();
