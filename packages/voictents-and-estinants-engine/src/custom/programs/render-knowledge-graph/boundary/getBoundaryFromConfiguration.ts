import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { OdeshinZorn } from '../../../adapter/odeshin2';
import {
  DirectoryVoque,
  DIRECTORY_GEPP,
} from '../../../programmable-units/file/directory';
import { BOUNDARY_GEPP, BoundaryInstance, BoundaryVoque } from './boundary';
import {
  BOUNDARY_CONFIGURATION_GEPP,
  BoundaryConfigurationVoque,
} from './boundaryConfiguration';

/**
 * Gathers the directory for a boundary given the directory path from the boundary configuration
 */
export const getBoundaryFromConfiguration = buildEstinant({
  name: 'getBoundaryFromConfiguration',
})
  .fromHubblepup2<BoundaryConfigurationVoque>({
    gepp: BOUNDARY_CONFIGURATION_GEPP,
  })
  .andFromHubblepupTuple2<DirectoryVoque, [OdeshinZorn]>({
    gepp: DIRECTORY_GEPP,
    framate: (locator) => [locator.hubblepup.directoryPath],
    croard: (directory) => directory.hubblepup.directoryPath.serialized,
  })
  .toHubblepup2<BoundaryVoque>({
    gepp: BOUNDARY_GEPP,
  })
  .onPinbe((boundaryConfiguration, [directory]) => {
    return new BoundaryInstance({
      displayName: boundaryConfiguration.displayName,
      directory,
    });
  })
  .assemble();
