import { posix } from 'path';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  DIRECTORY_GEPP,
  DirectoryVoque,
} from '../../../programmable-units/file/directory';
import {
  BOUNDARY_TRIE_B_GEPP,
  BoundaryTrieBVoque,
} from '../boundary/boundaryTrieB';
import {
  DIRECTORY_BOUNDARY_RELATIONSHIP_GEPP,
  DirectoryBoundaryRelationshipInstance,
  DirectoryBoundaryRelationshipVoque,
} from './directoryBoundaryRelationship';
import { isNotNull } from '../../../../utilities/isNotNull';

/**
 * Traverses the boundary trie to find the boundary for a directory
 */
export const getDirectoryBoundaryRelationship = buildEstinant({
  name: 'getDirectoryBoundaryRelationship',
})
  .fromHubblepup2<DirectoryVoque>({
    gepp: DIRECTORY_GEPP,
  })
  .andFromHubblepupTuple2<BoundaryTrieBVoque, ['']>({
    // TODO: make a more readable pattern for singletons
    gepp: BOUNDARY_TRIE_B_GEPP,
    framate: () => [''],
    croard: () => '',
  })
  .toHubblepupTuple2<DirectoryBoundaryRelationshipVoque>({
    gepp: DIRECTORY_BOUNDARY_RELATIONSHIP_GEPP,
  })
  .onPinbe((directory, [boundaryTrie]) => {
    // TODO: move path parsing elsewhere
    const pathList = directory.directoryPath.split(posix.sep);
    const boundary = boundaryTrie.find(pathList, isNotNull);

    if (boundary === null) {
      // this is not necessarily an error and error checking is handled by "assertDirectoriesHaveBoundaries"
      return [];
    }

    return [
      new DirectoryBoundaryRelationshipInstance({
        directory,
        boundary,
      }),
    ];
  })
  .assemble();
