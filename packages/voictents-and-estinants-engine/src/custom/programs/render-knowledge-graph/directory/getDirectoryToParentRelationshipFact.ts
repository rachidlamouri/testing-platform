import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { DIRECTORY_FACT_GEPP, DirectoryFactVoque } from './directoryFact';
import {
  DIRECTORY_TO_PARENT_RELATIONSHIP_FACT_GEPP,
  DirectoryToParentRelationshipFactInstance,
  DirectoryToParentRelationshipFactVoque,
} from './directoryToParentRelationshipFact';

/**
 * Stores a relationship between a directory fact and its parent directory fact.
 * The directory fact that corresponds to the directory of a boundary will not have a parent
 * directory fact. The behavior in that case is encapsulated in the
 * DirectoryToParentRelationshipFactInstance class.
 */
export const getDirectoryToParentRelationshipFact = buildEstinant({
  name: 'getDirectoryToParentRelationshipFact',
})
  .fromHubblepup2<DirectoryFactVoque>({
    gepp: DIRECTORY_FACT_GEPP,
  })
  .andFromHubblepupTuple2<DirectoryFactVoque, [] | [string]>({
    gepp: DIRECTORY_FACT_GEPP,
    framate: (directoryFact) => {
      if (directoryFact.hubblepup.isBoundaryDirectory) {
        return [];
      }

      return [directoryFact.hubblepup.directory.parentDirectoryPath];
    },
    croard: (directoryFact) => {
      return directoryFact.hubblepup.directory.directoryPath;
    },
  })
  .toHubblepup2<DirectoryToParentRelationshipFactVoque>({
    gepp: DIRECTORY_TO_PARENT_RELATIONSHIP_FACT_GEPP,
  })
  .onPinbe((childDirectoryFact, [parentDirectoryFact = null]) => {
    return new DirectoryToParentRelationshipFactInstance({
      childDirectoryFact,
      inputParentDirectoryFact: parentDirectoryFact,
    });
  })
  .assemble();
