import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_PROGRAM_LOCATOR_3_GEPP,
  EngineProgramLocator3Voque,
} from '../../../programmable-units/engine-program/engineProgramLocator3';
import {
  ENGINE_PROGRAM_FILE_GEPP,
  EngineProgramFileVoque,
} from '../../../programmable-units/type-script-file-relationships/engineProgramFile';
import { BOUNDARY_GEPP, BoundaryInstance, BoundaryVoque } from './boundary';

/**
 * Marks every engine program as a separate boundary
 */
export const getAdaptedProgramBoundary = buildEstinant({
  name: 'getAdaptedProgramBoundary',
})
  .fromHubblepup2<EngineProgramLocator3Voque>({
    gepp: ENGINE_PROGRAM_LOCATOR_3_GEPP,
  })
  .andFromHubblepupTuple2<EngineProgramFileVoque, [string]>({
    gepp: ENGINE_PROGRAM_FILE_GEPP,
    framate: (locator) => [locator.hubblepup.filePath],
    croard: (programFile) => programFile.hubblepup.file.filePath,
  })
  .toHubblepupTuple2<BoundaryVoque>({
    gepp: BOUNDARY_GEPP,
  })
  .onPinbe((programLocator, [programFile]) => {
    if (programLocator.isCoreProgram) {
      return [];
    }

    return [
      new BoundaryInstance({
        displayName: `Adapted Program: ${programLocator.programName}`,
        directoryPath: programFile.file.directoryPath,
      }),
    ];
  })
  .assemble();
