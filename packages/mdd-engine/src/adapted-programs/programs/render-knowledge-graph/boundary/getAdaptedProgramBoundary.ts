import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { IdentifiableItemId } from '../../../../adapter/identifiable-item/identifiableItem';
import {
  ENGINE_PROGRAM_LOCATOR_3_COLLECTION_ID,
  EngineProgramLocator3StreamMetatype,
} from '../../../programmable-units/engine-program/engineProgramLocator3';
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
 * Marks every adapted engine program as a separate boundary
 */
export const getAdaptedProgramBoundary = buildProgrammedTransform({
  name: 'getAdaptedProgramBoundary',
})
  .fromItem2<EngineProgramLocator3StreamMetatype>({
    collectionId: ENGINE_PROGRAM_LOCATOR_3_COLLECTION_ID,
  })
  .andFromItemTuple2<DirectoryStreamMetatype, [IdentifiableItemId]>({
    collectionId: DIRECTORY_COLLECTION_ID,
    getRightKeyTuple: (locator) => [
      locator.item.engineProgramFile.filePath.parentDirectoryPath,
    ],
    getRightKey: (directory) => directory.item.directoryPath.serialized,
  })
  .toItemTuple2<BoundaryStreamMetatype>({
    collectionId: BOUNDARY_COLLECTION_ID,
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
