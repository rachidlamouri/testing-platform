import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  DirectoryVoque,
  DIRECTORY_GEPP,
} from '../../../programmable-units/file/directory';
import { BoundaryVoque, BOUNDARY_GEPP } from '../boundary/boundary';
import {
  BOUNDARY_SUBDIRECTORY_SET_GEPP,
  BoundarySubdirectorySetInstance,
  BoundarySubdirectorySetVoque,
} from './boundarySubdirectorySet';

/**
 * Associates a boundary to every directory under it
 */
export const getBoundarySubdirectorySet = buildEstinant({
  name: 'getBoundarySubdirectorySet',
})
  .fromHubblepup2<BoundaryVoque>({
    gepp: BOUNDARY_GEPP,
  })
  .andFromVoictent2<DirectoryVoque>({
    gepp: DIRECTORY_GEPP,
  })
  .toHubblepup2<BoundarySubdirectorySetVoque>({
    gepp: BOUNDARY_SUBDIRECTORY_SET_GEPP,
  })
  .onPinbe((boundary, directoryList) => {
    const subdirectorySet = directoryList.filter((directory) => {
      return directory.directoryPath.startsWith(boundary.directoryPath);
    });

    return new BoundarySubdirectorySetInstance({
      boundary,
      subdirectorySet,
    });
  })
  .assemble();
