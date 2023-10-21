import { buildProgrammedTransform } from '../../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { ItemDefinitionId } from '../../item-definition/itemDefinitionId';
import {
  ITEM_DEFINITION_MODEL_COLLECTION_ID,
  ItemDefinitionModelStreamMetatype,
} from '../../item-definition/itemDefinitionModel';
import {
  PROGRAMMED_TRANSFORM_INPUT_MODEL_COLLECTION_ID,
  ProgrammedTransformInputModel,
  ProgrammedTransformInputModelStreamMetatype,
} from './programmedTransformInputModel';
import {
  PROGRAMMED_TRANSFORM_INPUT_SKELETON_COLLECTION_ID,
  ProgrammedTransformInputSkeletonStreamMetatype,
} from './programmedTransformInputSkeleton';

/**
 * Combines a programmed transform input skeleton with an item definition to
 * make an input model
 */
export const buildProgrammedTransformInputModel = buildProgrammedTransform({
  name: 'buildProgrammedTransformInputModel',
})
  .fromItem2<ProgrammedTransformInputSkeletonStreamMetatype>({
    collectionId: PROGRAMMED_TRANSFORM_INPUT_SKELETON_COLLECTION_ID,
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
  .toItem2<ProgrammedTransformInputModelStreamMetatype>({
    collectionId: PROGRAMMED_TRANSFORM_INPUT_MODEL_COLLECTION_ID,
  })
  .onTransform((inputSkeleton, [itemDefinition]) => {
    return new ProgrammedTransformInputModel({
      skeleton: inputSkeleton,
      itemDefinition,
    });
  })
  .assemble();
