import { buildEstinant } from '../../../../adapter/estinant-builder/buildEstinant';
import { OdeshinZorn } from '../../../../adapter/odeshin/identifiableItem';
import {
  ENGINE_PROGRAM_LOCATOR_3_GEPP,
  EngineProgramLocator3Voque,
} from '../../../programmable-units/engine-program/engineProgramLocator3';
import {
  DIRECTORY_GEPP,
  DirectoryVoque,
} from '../../../programmable-units/file/directory';
import { BOUNDARY_GEPP, BoundaryInstance, BoundaryVoque } from './boundary';
import { BoundaryTypeName } from './boundaryTypeName';

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
      locator.item.engineProgramFile.filePath.parentDirectoryPath,
    ],
    croard: (directory) => directory.item.directoryPath.serialized,
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
        typeName: BoundaryTypeName.AdaptedProgram,
        displayName: programLocator.programName,
        directory,
      }),
    ];
  })
  .assemble();
