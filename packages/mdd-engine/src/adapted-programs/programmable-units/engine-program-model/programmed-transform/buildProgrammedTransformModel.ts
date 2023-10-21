import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { Tuple } from '../../../../package-agnostic-utilities/type/tuple';
import { ProgrammedTransformInputId } from './input/programmedTransformInputId';
import {
  PROGRAMMED_TRANSFORM_INPUT_MODEL_COLLECTION_ID,
  ProgrammedTransformInputModelStreamMetatype,
} from './input/programmedTransformInputModel';
import { ProgrammedTransformOutputId } from './output/programmedTransformOutputId';
import {
  PROGRAMMED_TRANSFORM_OUTPUT_MODEL_COLLECTION_ID,
  ProgrammedTransformOutputModelStreamMetatype,
} from './output/programmedTransformOutputModel';
import {
  PROGRAMMED_TRANSFORM_MODEL_COLLECTION_ID,
  ProgrammedTransformModel,
  ProgrammedTransformModelStreamMetatype,
} from './programmedTransformModel';
import {
  PROGRAMMED_TRANSFORM_SKELETON_COLLECTION_ID,
  ProgrammedTransformSkeletonStreamMetatype,
} from './programmedTransformSkeleton';

/**
 * Uses a ProgrammedTransformSkeleton to find the corresponding list of input
 * and output models in order to form a ProgrammedTransformModel
 */
export const buildProgrammedTransformModel = buildProgrammedTransform({
  name: 'buildProgrammedTransformModel',
})
  .fromItem2<ProgrammedTransformSkeletonStreamMetatype>({
    collectionId: PROGRAMMED_TRANSFORM_SKELETON_COLLECTION_ID,
  })
  .andFromItemTuple2<
    ProgrammedTransformInputModelStreamMetatype,
    Tuple<ProgrammedTransformInputId>
  >({
    collectionId: PROGRAMMED_TRANSFORM_INPUT_MODEL_COLLECTION_ID,
    getRightKeyTuple: (transformSkeleton) => {
      return transformSkeleton.item.inputSkeletonList.map((inputSkeleton) => {
        return inputSkeleton.id;
      });
    },
    getRightKey: (inputSkeleton) => {
      return inputSkeleton.item.id;
    },
  })
  .andFromItemTuple2<
    ProgrammedTransformOutputModelStreamMetatype,
    Tuple<ProgrammedTransformOutputId>
  >({
    collectionId: PROGRAMMED_TRANSFORM_OUTPUT_MODEL_COLLECTION_ID,
    getRightKeyTuple: (transformSkeleton) => {
      return transformSkeleton.item.outputSkeletonList.map((outputSkeleton) => {
        return outputSkeleton.id;
      });
    },
    getRightKey: (inputSkeleton) => {
      return inputSkeleton.item.id;
    },
  })
  .toItem2<ProgrammedTransformModelStreamMetatype>({
    collectionId: PROGRAMMED_TRANSFORM_MODEL_COLLECTION_ID,
  })
  .onTransform((transformSkeleton, inputModelList, outputModelList) => {
    return new ProgrammedTransformModel({
      skeleton: transformSkeleton,
      inputModelList,
      outputModelList,
    });
  })
  .assemble();
