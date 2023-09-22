import { buildEstinant } from '../../../../adapter/estinant-builder/estinantBuilder';
import { OdeshinZorn } from '../../../../adapter/odeshin/odeshin2';
import {
  ENGINE_PROGRAM_LOCATOR_3_GEPP,
  EngineProgramLocator3Voque,
} from '../../../programmable-units/engine-program/engineProgramLocator3';
import {
  DIRECTORY_GEPP,
  DirectoryVoque,
} from '../../../programmable-units/file/directory';
import { BOUNDARY_GEPP, BoundaryInstance, BoundaryVoque } from './boundary';

/**
 * Marks every adapted engine program as a separate boundary
 */
export const getAdaptedProgramBoundary = buildEstinant({
  name: 'getAdaptedProgramBoundary',
})
  .fromHubblepup2<EngineProgramLocator3Voque>({
    gepp: ENGINE_PROGRAM_LOCATOR_3_GEPP,
  })
  .andFromHubblepupTuple2<DirectoryVoque, [OdeshinZorn]>({
    gepp: DIRECTORY_GEPP,
    framate: (locator) => [
      locator.hubblepup.engineProgramFile.filePath.parentDirectoryPath,
    ],
    croard: (directory) => directory.hubblepup.directoryPath.serialized,
  })
  .toHubblepupTuple2<BoundaryVoque>({
    gepp: BOUNDARY_GEPP,
  })
  .onPinbe((programLocator, [directory]) => {
    if (programLocator.isCoreProgram) {
      return [];
    }

    return [
      new BoundaryInstance({
        displayName: programLocator.programName,
        directory,
      }),
    ];
  })
  .assemble();
