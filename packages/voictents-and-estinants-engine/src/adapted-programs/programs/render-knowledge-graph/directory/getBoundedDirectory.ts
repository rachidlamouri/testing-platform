import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  DIRECTORY_GEPP,
  DirectoryVoque,
} from '../../../programmable-units/file/directory';
import {
  BOUNDED_DIRECTORY_GEPP,
  BoundedDirectoryInstance,
  BoundedDirectoryVoque,
} from './boundedDirectory';
import { isNotNull } from '../../../../package-agnostic-utilities/nil/isNotNull';
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
export const getBoundedDirectory = buildProgrammedTransform({
  name: 'getBoundedDirectory',
})
  .fromItem2<DirectoryVoque>({
    collectionId: DIRECTORY_GEPP,
  })
  .andFromItemTuple2<CommonBoundaryRootVoque, ['']>({
    collectionId: COMMON_BOUNDARY_ROOT_GEPP,
    // TODO: make a more readable pattern for singleton collections
    getRightKeyTuple: () => [''],
    getRightKey: () => '',
  })
  .andFromItemTuple2<PartitionedBoundaryTrieVoque, ['']>({
    // TODO: make a more readable pattern for singletons
    collectionId: PARTITIONED_BOUNDARY_TRIE_GEPP,
    getRightKeyTuple: () => [''],
    getRightKey: () => '',
  })
  .toItemTuple2<BoundedDirectoryVoque>({
    collectionId: BOUNDED_DIRECTORY_GEPP,
  })
  .onTransform((directory, [commonBoundaryRoot], [partitionedBoundaryTrie]) => {
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
