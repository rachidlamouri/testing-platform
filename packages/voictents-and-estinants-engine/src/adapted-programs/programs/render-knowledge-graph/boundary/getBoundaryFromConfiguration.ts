import { buildProgrammedTransform } from '../../../../adapter/estinant-builder/buildEstinant';
import { OdeshinZorn } from '../../../../adapter/identifiable-item/identifiableItem';
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
export const getBoundaryFromConfiguration = buildProgrammedTransform({
  name: 'getBoundaryFromConfiguration',
})
  .fromItem2<BoundaryConfigurationVoque>({
    collectionId: BOUNDARY_CONFIGURATION_GEPP,
  })
  .andFromItemTuple2<DirectoryVoque, [OdeshinZorn]>({
    collectionId: DIRECTORY_GEPP,
    getRightKeyTuple: (locator) => [locator.item.directoryPath],
    getRightKey: (directory) => directory.item.directoryPath.serialized,
  })
  .toItem2<BoundaryVoque>({
    collectionId: BOUNDARY_GEPP,
  })
  .onTransform((boundaryConfiguration, [directory]) => {
    return new BoundaryInstance({
      typeName: boundaryConfiguration.typeName,
      displayName: boundaryConfiguration.displayName,
      directory,
    });
  })
  .assemble();
