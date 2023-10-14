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
 * Marks every directory under programmable-units as a separate boundary
 */
export const getProgrammableUnitBoundary = buildProgrammedTransform({
  name: 'getProgrammableUnitBoundary',
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
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units'
    ) {
      return [];
    }

    return [
      new BoundaryInstance({
        typeName: BoundaryTypeName.ProgrammableUnit,
        displayName: Case.kebab(directory.directoryPath.name.serialized),
        directory,
      }),
    ];
  })
  .assemble();
