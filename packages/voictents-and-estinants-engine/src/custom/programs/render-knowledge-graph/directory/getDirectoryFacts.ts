import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  BOUNDARY_FACT_GEPP,
  BoundaryFactVoque,
} from '../boundary/boundaryFact';
import {
  BOUNDARY_SUBDIRECTORY_SET_GEPP,
  BoundarySubdirectorySetVoque,
} from './boundarySubdirectorySet';
import {
  DIRECTORY_FACT_GEPP,
  DirectoryFactInstance,
  DirectoryFactVoque,
} from './directoryFact';

/**
 * Gets all graph metadata for a directory within a boundary. This also helps
 * set the parent ids of child elements
 */
export const getDirectoryFacts = buildEstinant({
  name: 'getDirectoryFacts',
})
  .fromHubblepup2<BoundarySubdirectorySetVoque>({
    gepp: BOUNDARY_SUBDIRECTORY_SET_GEPP,
  })
  .andFromHubblepupTuple2<BoundaryFactVoque, [string]>({
    gepp: BOUNDARY_FACT_GEPP,
    framate: (boundarysubDirectorySet) => [
      boundarysubDirectorySet.hubblepup.boundary.zorn,
    ],
    croard: (boundaryFact) => {
      return boundaryFact.hubblepup.boundary.zorn;
    },
  })
  .toHubblepupTuple2<DirectoryFactVoque>({
    gepp: DIRECTORY_FACT_GEPP,
  })
  .onPinbe((boundarySubdirectorySet, [boundaryFact]) => {
    const outputList = boundarySubdirectorySet.subdirectorySet.map(
      (directory) => {
        return new DirectoryFactInstance({
          boundaryFact,
          directory,
        });
      },
    );

    return outputList;
  })
  .assemble();
