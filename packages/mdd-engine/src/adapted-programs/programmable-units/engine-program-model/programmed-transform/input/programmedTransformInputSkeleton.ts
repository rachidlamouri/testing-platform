import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { ItemDefinitionLocator } from '../../item-definition/itemDefinitionLocator';
import { ProgrammedTransformLocator } from '../programmedTransformLocator';
import { ProgrammedTransformInputId } from './programmedTransformInputId';

type ProgrammedTransformInputSkeletonInput = {
  programmedTransformLocator: ProgrammedTransformLocator;
  index: number;
  itemDefinitionLocator: ItemDefinitionLocator;
};

/**
 * The informationed needed to gather everything required to assemble a
 * ProgrammedTransformInputModel
 */
export class ProgrammedTransformInputSkeleton
  implements ProgrammedTransformInputSkeletonInput
{
  id: ProgrammedTransformInputId;

  programmedTransformLocator: ProgrammedTransformLocator;

  index: number;

  itemDefinitionLocator: ItemDefinitionLocator;

  constructor(input: ProgrammedTransformInputSkeletonInput) {
    // TODO: define class

    this.id = new ProgrammedTransformInputId({
      programmedTransform: input.programmedTransformLocator.id,
      type: 'input',
      index: `${input.index}`,
    });

    this.programmedTransformLocator = input.programmedTransformLocator;
    this.index = input.index;
    this.itemDefinitionLocator = input.itemDefinitionLocator;
  }
}

export const PROGRAMMED_TRANSFORM_INPUT_SKELETON_COLLECTION_ID =
  'programmed-transform-input-skeleton';

type ProgrammedTransformInputSkeletonCollectionId =
  typeof PROGRAMMED_TRANSFORM_INPUT_SKELETON_COLLECTION_ID;

export type ProgrammedTransformInputSkeletonStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ProgrammedTransformInputSkeletonCollectionId,
    ProgrammedTransformInputSkeleton
  >;
