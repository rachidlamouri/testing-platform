import Case from 'case';
import { buildEstinant } from '../../../../adapter/estinant-builder/buildEstinant';
import {
  DIRECTORY_GEPP,
  DirectoryVoque,
} from '../../../programmable-units/file/directory';
import { BOUNDARY_GEPP, BoundaryInstance, BoundaryVoque } from './boundary';
import { BoundaryTypeName } from './boundaryTypeName';

/**
 * Marks every directory under programmable-units as a separate boundary
 */
export const getProgrammableUnitBoundary = buildEstinant({
  name: 'getProgrammableUnitBoundary',
})
  .fromHubblepup2<DirectoryVoque>({
    gepp: DIRECTORY_GEPP,
  })
  .toHubblepupTuple2<BoundaryVoque>({
    gepp: BOUNDARY_GEPP,
  })
  .onPinbe((directory) => {
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
