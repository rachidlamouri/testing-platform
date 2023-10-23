import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  PROGRAM_MODEL_COLLECTION_ID,
  ProgramModel,
  ProgramModelStreamMetatype,
} from './programModel';
import {
  PROGRAM_SKELETON_COLLECTION_ID,
  ProgramSkeletonStreamMetatype,
} from './programSkeleton';

/**
 * Converts a program skeleton into a program model
 */
export const buildProgramModel = buildProgrammedTransform({
  name: 'buildProgramModel',
})
  .fromItem2<ProgramSkeletonStreamMetatype>({
    collectionId: PROGRAM_SKELETON_COLLECTION_ID,
  })
  .toItem2<ProgramModelStreamMetatype>({
    collectionId: PROGRAM_MODEL_COLLECTION_ID,
  })
  .onTransform((skeleton) => {
    return new ProgramModel({
      skeleton,
    });
  })
  .assemble();
