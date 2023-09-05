import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';

import { OdeshinZorn } from '../../../adapter/odeshin2';
import {
  DIRECTORY_GEPP,
  DirectoryVoque,
} from '../../../programmable-units/file/directory';
import {
  BOUNDARY_ASSOCIATION_GEPP,
  BoundaryAssociationVoque,
} from '../boundary/boundaryAssociation';
import {
  BOUNDARY_TO_BOUNDED_DIRECTORY_ASSOCIATION_GEPP,
  BoundaryToBoundedDirectoryAssociationInstance,
  BoundaryToBoundedDirectoryAssociationVoque,
} from './boundaryToBoundedDirectoryAssociation';
import {
  BOUNDED_DIRECTORY_GEPP,
  BoundedDirectoryVoque,
} from './boundedDirectory';

export const getBoundaryToBoundedDirectoryAssociation = buildEstinant({
  name: 'getBoundaryToBoundedDirectoryAssociation',
})
  .fromHubblepup2<BoundedDirectoryVoque>({
    gepp: BOUNDED_DIRECTORY_GEPP,
  })
  .andFromHubblepupTuple2<BoundaryAssociationVoque, [OdeshinZorn]>({
    gepp: BOUNDARY_ASSOCIATION_GEPP,
    framate: (boundedDirectory) => {
      return [boundedDirectory.hubblepup.boundary.zorn];
    },
    croard: (boundaryAssociation) => {
      return boundaryAssociation.hubblepup.referencedBoundary.zorn;
    },
  })
  .andFromHubblepupTuple2<DirectoryVoque, [OdeshinZorn]>({
    gepp: DIRECTORY_GEPP,
    framate: (boundedDirectory) => {
      return [boundedDirectory.hubblepup.directory.parentDirectoryPath];
    },
    croard: (potentialParentDirectory) => {
      return potentialParentDirectory.hubblepup.directoryPath;
    },
  })
  .toHubblepup2<BoundaryToBoundedDirectoryAssociationVoque>({
    gepp: BOUNDARY_TO_BOUNDED_DIRECTORY_ASSOCIATION_GEPP,
  })
  .onPinbe((boundedDirectory, [boundaryAssociation], [parentDirectory]) => {
    return new BoundaryToBoundedDirectoryAssociationInstance({
      boundaryAssociation,
      parentDirectory,
      boundedDirectory,
    });
  })
  .assemble();
