import { buildProgrammedTransform } from '../../../../adapter/estinant-builder/buildEstinant';
import { OdeshinZorn } from '../../../../adapter/identifiable-item/identifiableItem';
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
export const getAdaptedProgramBoundary = buildProgrammedTransform({
  name: 'getAdaptedProgramBoundary',
})
  .fromItem2<EngineProgramLocator3Voque>({
    collectionId: ENGINE_PROGRAM_LOCATOR_3_GEPP,
  })
  .andFromItemTuple2<DirectoryVoque, [OdeshinZorn]>({
    collectionId: DIRECTORY_GEPP,
    getRightKeyTuple: (locator) => [
      locator.item.engineProgramFile.filePath.parentDirectoryPath,
    ],
    getRightKey: (directory) => directory.item.directoryPath.serialized,
  })
  .toItemTuple2<BoundaryVoque>({
    collectionId: BOUNDARY_GEPP,
  })
  .onTransform((programLocator, [directory]) => {
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
