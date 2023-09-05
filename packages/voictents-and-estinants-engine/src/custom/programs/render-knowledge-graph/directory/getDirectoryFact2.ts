import { Tuple } from '../../../../utilities/semantic-types/tuple';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { OdeshinZorn } from '../../../adapter/odeshin2';
import {
  BOUNDARY_ASSOCIATION_GEPP,
  BoundaryAssociationVoque,
} from '../boundary/boundaryAssociation';
import {
  BOUNDARY_FACT_GEPP,
  BoundaryFactVoque,
} from '../boundary/boundaryFact';
import {
  BOUNDARY_TO_BOUNDED_DIRECTORY_ASSOCIATION_GEPP,
  BoundaryToBoundedDirectoryAssociationVoque,
} from './boundaryToBoundedDirectoryAssociation';
import {
  BOUNDED_DIRECTORY_GEPP,
  BoundedDirectoryVoque,
} from './boundedDirectory';
import {
  DIRECTORY_FACT_2_GEPP,
  DirectoryFact2Instance,
  DirectoryFact2Voque,
} from './directoryFact2';

export const getDirectoryFact2 = buildEstinant({
  name: 'getDirectoryFact2',
})
  .fromHubblepup2<BoundaryToBoundedDirectoryAssociationVoque>({
    gepp: BOUNDARY_TO_BOUNDED_DIRECTORY_ASSOCIATION_GEPP,
  })
  .andFromHubblepupTuple2<BoundaryFactVoque, [OdeshinZorn]>({
    gepp: BOUNDARY_FACT_GEPP,
    framate: (boundaryToBoundedDirectory) => {
      return [
        boundaryToBoundedDirectory.hubblepup.boundaryAssociation
          .referencingBoundary.zorn,
      ];
    },
    croard: (boundaryFact) => {
      return boundaryFact.hubblepup.boundary.zorn;
    },
  })
  .andFromHubblepupTuple2<BoundedDirectoryVoque, [] | [string]>({
    gepp: BOUNDED_DIRECTORY_GEPP,
    framate: (boundaryToBoundedDirectory) => {
      if (
        boundaryToBoundedDirectory.hubblepup.boundedDirectory
          .isBoundaryDirectory
      ) {
        return [];
      }

      return [
        boundaryToBoundedDirectory.hubblepup.parentDirectory.directoryPath,
      ];
    },
    croard: (potentialParentBoundedDirectory) => {
      return potentialParentBoundedDirectory.hubblepup.directory.directoryPath;
    },
  })
  .toHubblepup2<DirectoryFact2Voque>({
    gepp: DIRECTORY_FACT_2_GEPP,
  })
  .onPinbe(
    (
      boundaryToBoundedDirectory,
      [boundaryFact],
      [parentBoundedDirectory = null],
    ) => {
      return new DirectoryFact2Instance({
        boundaryFact,
        parentBoundedDirectory,
        boundedDirectory: boundaryToBoundedDirectory.boundedDirectory,
      });
    },
  )
  .assemble();
