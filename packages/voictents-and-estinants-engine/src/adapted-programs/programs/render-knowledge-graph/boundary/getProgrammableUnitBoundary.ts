import Case from 'case';
import { buildProgrammedTransform } from '../../../../adapter/estinant-builder/buildEstinant';
import {
  DIRECTORY_GEPP,
  DirectoryVoque,
} from '../../../programmable-units/file/directory';
import { BOUNDARY_GEPP, BoundaryInstance, BoundaryVoque } from './boundary';
import { BoundaryTypeName } from './boundaryTypeName';

/**
 * Marks every directory under programmable-units as a separate boundary
 */
export const getProgrammableUnitBoundary = buildProgrammedTransform({
  name: 'getProgrammableUnitBoundary',
})
  .fromItem2<DirectoryVoque>({
    collectionId: DIRECTORY_GEPP,
  })
  .toItemTuple2<BoundaryVoque>({
    collectionId: BOUNDARY_GEPP,
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
