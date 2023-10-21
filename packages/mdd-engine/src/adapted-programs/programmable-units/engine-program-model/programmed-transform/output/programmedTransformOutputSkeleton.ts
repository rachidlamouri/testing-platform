import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { ItemDefinitionLocator } from '../../item-definition/itemDefinitionLocator';
import { ProgrammedTransformLocator } from '../programmedTransformLocator';
import { ProgrammedTransformOutputId } from './programmedTransformOutputId';

type ProgrammedTransformOutputSkeletonInput = {
  programmedTransformLocator: ProgrammedTransformLocator;
  index: number;
  itemDefinitionLocator: ItemDefinitionLocator;
};

/**
 * The informationed needed to gather everything to assemble a
 * ProgrammedTransformOutputModel
 */
export class ProgrammedTransformOutputSkeleton
  implements ProgrammedTransformOutputSkeletonInput
{
  id: ProgrammedTransformOutputId;

  programmedTransformLocator: ProgrammedTransformLocator;

  index: number;

  itemDefinitionLocator: ItemDefinitionLocator;

  constructor(input: ProgrammedTransformOutputSkeletonInput) {
    this.id = new ProgrammedTransformOutputId({
      programmedTransform: input.programmedTransformLocator.id,
      type: 'output',
      index: `${input.index}`,
    });

    this.programmedTransformLocator = input.programmedTransformLocator;
    this.index = input.index;
    this.itemDefinitionLocator = input.itemDefinitionLocator;
  }
}

export const PROGRAMMED_TRANSFORM_OUTPUT_SKELETON_COLLECTION_ID =
  'programmed-transform-output-skeleton';

type ProgrammedTransformOutputSkeletonCollectionId =
  typeof PROGRAMMED_TRANSFORM_OUTPUT_SKELETON_COLLECTION_ID;

export type ProgrammedTransformOutputSkeletonStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ProgrammedTransformOutputSkeletonCollectionId,
    ProgrammedTransformOutputSkeleton
  >;
