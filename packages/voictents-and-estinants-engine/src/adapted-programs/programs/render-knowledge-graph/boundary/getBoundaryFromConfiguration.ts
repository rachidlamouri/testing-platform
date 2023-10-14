import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { IdentifiableItemId } from '../../../../adapter/identifiable-item/identifiableItem';
import {
  DirectoryStreamMetatype,
  DIRECTORY_COLLECTION_ID,
} from '../../../programmable-units/file/directory';
import {
  BOUNDARY_COLLECTION_ID,
  BoundaryInstance,
  BoundaryStreamMetatype,
} from './boundary';
import {
  BOUNDARY_CONFIGURATION_COLLECTION_ID,
  BoundaryConfigurationStreamMetatype,
} from './boundaryConfiguration';

/**
 * Gathers the directory for a boundary given the directory path from the boundary configuration
 */
export const getBoundaryFromConfiguration = buildProgrammedTransform({
  name: 'getBoundaryFromConfiguration',
})
  .fromItem2<BoundaryConfigurationStreamMetatype>({
    collectionId: BOUNDARY_CONFIGURATION_COLLECTION_ID,
  })
  .andFromItemTuple2<DirectoryStreamMetatype, [IdentifiableItemId]>({
    collectionId: DIRECTORY_COLLECTION_ID,
    getRightKeyTuple: (locator) => [locator.item.directoryPath],
    getRightKey: (directory) => directory.item.directoryPath.serialized,
  })
  .toItem2<BoundaryStreamMetatype>({
    collectionId: BOUNDARY_COLLECTION_ID,
  })
  .onTransform((boundaryConfiguration, [directory]) => {
    return new BoundaryInstance({
      typeName: boundaryConfiguration.typeName,
      displayName: boundaryConfiguration.displayName,
      directory,
    });
  })
  .assemble();
