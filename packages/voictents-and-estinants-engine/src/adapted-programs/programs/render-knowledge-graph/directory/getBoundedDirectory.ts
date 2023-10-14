import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  DIRECTORY_COLLECTION_ID,
  DirectoryStreamMetatype,
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
  CommonBoundaryRootStreamMetatype,
  COMMON_BOUNDARY_ROOT_COLLECTION_ID,
} from '../common-boundary-root/commonBoundaryRoot';

/**
 * Associates a directory to a boundary
 */
export const getBoundedDirectory = buildProgrammedTransform({
  name: 'getBoundedDirectory',
})
  .fromItem2<DirectoryStreamMetatype>({
    collectionId: DIRECTORY_COLLECTION_ID,
  })
  .andFromItemTuple2<CommonBoundaryRootStreamMetatype, ['']>({
    collectionId: COMMON_BOUNDARY_ROOT_COLLECTION_ID,
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
