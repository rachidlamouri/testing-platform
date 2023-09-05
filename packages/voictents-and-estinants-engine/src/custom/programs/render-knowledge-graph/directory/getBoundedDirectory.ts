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
import {
  BOUNDARY_TRIE_B_GEPP,
  BoundaryTrieBVoque,
} from '../boundary/boundaryTrieB';
import { isNotNull } from '../../../../utilities/isNotNull';
import {
  CommonBoundaryRootVoque,
  COMMON_BOUNDARY_ROOT_GEPP,
} from '../common-boundary-root/commonBoundaryRoot';

export const getBoundedDirectory = buildEstinant({
  name: 'getBoundedDirectory',
})
  .fromHubblepup2<DirectoryVoque>({
    gepp: DIRECTORY_GEPP,
  })
  // TODO: you can't get a parent directory for every directory; only the bounded ones :thinking:
  // .andFromHubblepupTuple2<DirectoryVoque, [string]>({
  //   gepp: DIRECTORY_GEPP,
  //   framate: (directory) => [directory.hubblepup.parentDirectoryPath],
  //   croard: (potentialParentDirectory) => {
  //     return potentialParentDirectory.hubblepup.directoryPath;
  //   },
  // })
  .andFromHubblepupTuple2<BoundaryTrieBVoque, ['']>({
    // TODO: make a more readable pattern for singletons
    gepp: BOUNDARY_TRIE_B_GEPP,
    framate: () => [''],
    croard: () => '',
  })
  .andFromHubblepupTuple2<CommonBoundaryRootVoque, ['']>({
    gepp: COMMON_BOUNDARY_ROOT_GEPP,
    // TODO: make a more readable pattern for singleton collections
    framate: () => [''],
    croard: () => '',
  })
  .toHubblepupTuple2<BoundedDirectoryVoque>({
    gepp: BOUNDED_DIRECTORY_GEPP,
  })
  .onPinbe((directory, [boundaryTrieB], [commonBoundaryRoot]) => {
    const boundary = boundaryTrieB.find(
      directory.directoryPathPartList,
      isNotNull,
    );

    if (boundary === null) {
      // This is not necessarily an error, because directories without files do not have to be in a boundary. Error checking is handled by "assertDirectoriesHaveBoundaries"
      return [];
    }

    return [
      new BoundedDirectoryInstance({
        boundary,
        // parentDirectory,
        directory,
        commonBoundaryRoot,
      }),
    ];
  })
  .assemble();
