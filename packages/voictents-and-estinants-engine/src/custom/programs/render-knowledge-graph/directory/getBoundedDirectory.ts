import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  DIRECTORY_GEPP,
  DirectoryVoque,
} from '../../../programmable-units/file/directory';
import {
  BOUNDED_DIRECTORY_GEPP,
  BoundedDirectoryInstance,
  BoundedDirectoryVoque,
} from './boundedDirectory';
import { isNotNull } from '../../../../utilities/isNotNull';
import {
  PARTITIONED_BOUNDARY_TRIE_GEPP,
  PartitionedBoundaryTrieVoque,
} from '../boundary/partitionedBoundaryTrie';
import {
  CommonBoundaryRootVoque,
  COMMON_BOUNDARY_ROOT_GEPP,
} from '../common-boundary-root/commonBoundaryRoot';

/**
 * Associates a directory to a boundary
 */
export const getBoundedDirectory = buildEstinant({
  name: 'getBoundedDirectory',
})
  .fromHubblepup2<DirectoryVoque>({
    gepp: DIRECTORY_GEPP,
  })
  .andFromHubblepupTuple2<CommonBoundaryRootVoque, ['']>({
    gepp: COMMON_BOUNDARY_ROOT_GEPP,
    // TODO: make a more readable pattern for singleton collections
    framate: () => [''],
    croard: () => '',
  })
  .andFromHubblepupTuple2<PartitionedBoundaryTrieVoque, ['']>({
    // TODO: make a more readable pattern for singletons
    gepp: PARTITIONED_BOUNDARY_TRIE_GEPP,
    framate: () => [''],
    croard: () => '',
  })
  .toHubblepupTuple2<BoundedDirectoryVoque>({
    gepp: BOUNDED_DIRECTORY_GEPP,
  })
  .onPinbe((directory, [commonBoundaryRoot], [partitionedBoundaryTrie]) => {
    const partitionedBoundary = partitionedBoundaryTrie.find(
      directory.nodePath.partList,
      isNotNull,
    );

    if (partitionedBoundary === null) {
      // "assertDirectoriesHaveBoundaries" covers this edge case
      // This is not necessarily an error, because directories without files do not have to be in a boundary
      return [];
    }

    return [
      new BoundedDirectoryInstance({
        boundary: partitionedBoundary.boundary,
        commonBoundaryRoot,
        directory,
      }),
    ];
  })
  .assemble();
