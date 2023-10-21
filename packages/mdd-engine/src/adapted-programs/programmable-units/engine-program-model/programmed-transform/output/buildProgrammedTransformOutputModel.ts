import { buildProgrammedTransform } from '../../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { ItemDefinitionId } from '../../item-definition/itemDefinitionId';
import {
  ITEM_DEFINITION_MODEL_COLLECTION_ID,
  ItemDefinitionModelStreamMetatype,
} from '../../item-definition/itemDefinitionModel';
import {
  PROGRAMMED_TRANSFORM_OUTPUT_MODEL_COLLECTION_ID,
  ProgrammedTransformOutputModel,
  ProgrammedTransformOutputModelStreamMetatype,
} from './programmedTransformOutputModel';
import {
  PROGRAMMED_TRANSFORM_OUTPUT_SKELETON_COLLECTION_ID,
  ProgrammedTransformOutputSkeletonStreamMetatype,
} from './programmedTransformOutputSkeleton';

/**
 * Combines a programmed transform output skeleton with an item definition to
 * make an output model
 */
export const buildProgrammedTransformOutputModel = buildProgrammedTransform({
  name: 'buildProgrammedTransformOutputModel',
})
  .fromItem2<ProgrammedTransformOutputSkeletonStreamMetatype>({
    collectionId: PROGRAMMED_TRANSFORM_OUTPUT_SKELETON_COLLECTION_ID,
  })
  .andFromItemTuple2<ItemDefinitionModelStreamMetatype, [ItemDefinitionId]>({
    collectionId: ITEM_DEFINITION_MODEL_COLLECTION_ID,
    getRightKeyTuple: (leftInput) => {
      return [leftInput.item.itemDefinitionLocator.id];
    },
    getRightKey: (rightInput) => {
      return rightInput.item.id;
    },
  })
  .toItem2<ProgrammedTransformOutputModelStreamMetatype>({
    collectionId: PROGRAMMED_TRANSFORM_OUTPUT_MODEL_COLLECTION_ID,
  })
  .onTransform((outputSkeleton, [itemDefinition]) => {
    return new ProgrammedTransformOutputModel({
      skeleton: outputSkeleton,
      itemDefinition,
    });
  })
  .assemble();
