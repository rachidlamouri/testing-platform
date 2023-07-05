import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  BOUNDARY_FACT_GEPP,
  BoundaryFactVoque,
} from '../boundary/boundaryFact';
import {
  DIRECTORY_BOUNDARY_RELATIONSHIP_GEPP,
  DirectoryBoundaryRelationshipVoque,
} from './directoryBoundaryRelationship';
import {
  DIRECTORY_FACT_GEPP,
  DirectoryFactInstance,
  DirectoryFactVoque,
} from './directoryFact';

/**
 * Gets graph metadata for a directory within a boundary. This also helps set
 * the parent ids of child elements
 */
export const getDirectoryFact = buildEstinant({
  name: 'getDirectoryFact',
})
  .fromHubblepup2<DirectoryBoundaryRelationshipVoque>({
    gepp: DIRECTORY_BOUNDARY_RELATIONSHIP_GEPP,
  })
  .andFromHubblepupTuple2<BoundaryFactVoque, [string]>({
    gepp: BOUNDARY_FACT_GEPP,
    framate: (relationship) => [relationship.hubblepup.boundary.zorn],
    croard: (boundaryFact) => {
      return boundaryFact.hubblepup.boundary.zorn;
    },
  })
  .toHubblepup2<DirectoryFactVoque>({
    gepp: DIRECTORY_FACT_GEPP,
  })
  .onPinbe((relationship, [boundaryFact]) => {
    return new DirectoryFactInstance({
      boundaryFact,
      directory: relationship.directory,
    });
  })
  .assemble();
