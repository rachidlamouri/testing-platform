import Case from 'case';
import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  DIRECTORY_GEPP,
  DirectoryVoque,
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
  .fromItem2<DirectoryVoque>({
    collectionId: DIRECTORY_GEPP,
  })
  .toItemTuple2<BoundaryStreamMetatype>({
    collectionId: BOUNDARY_COLLECTION_ID,
  })
  .onTransform((directory) => {
    // TODO: update the stream configuration to allow filtering the inputs
    if (
      directory.directoryPath.parentDirectoryPath !==
        'packages/voictents-and-estinants-engine/src/layer-agnostic-utilities' &&
      directory.directoryPath.parentDirectoryPath !==
        'packages/voictents-and-estinants-engine/src/package-agnostic-utilities'
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
