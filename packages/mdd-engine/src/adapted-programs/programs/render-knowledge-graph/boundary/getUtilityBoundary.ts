import Case from 'case';
import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  DIRECTORY_COLLECTION_ID,
  DirectoryStreamMetatype,
} from '../../../programmable-units/file/directory';
import {
  BOUNDARY_COLLECTION_ID,
  BoundaryInstance,
  BoundaryStreamMetatype,
} from './boundary';
import { BoundaryTypeName } from './boundaryTypeName';

/**
 * Marks every directory under utilities as a separate boundary
 */
export const getUtilityBoundary = buildProgrammedTransform({
  name: 'getUtilityBoundary',
})
  .fromItem2<DirectoryStreamMetatype>({
    collectionId: DIRECTORY_COLLECTION_ID,
  })
  .toItemTuple2<BoundaryStreamMetatype>({
    collectionId: BOUNDARY_COLLECTION_ID,
  })
  .onTransform((directory) => {
    // TODO: update the stream configuration to allow filtering the inputs
    if (
      directory.directoryPath.parentDirectoryPath !==
        'packages/mdd-engine/src/layer-agnostic-utilities' &&
      directory.directoryPath.parentDirectoryPath !==
        'packages/mdd-engine/src/package-agnostic-utilities'
    ) {
      return [];
    }

    return [
      new BoundaryInstance({
        typeName: BoundaryTypeName.Utility,
        displayName: Case.kebab(directory.directoryPath.name.serialized),
        directory,
      }),
    ];
  })
  .assemble();
