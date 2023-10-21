import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { ItemDefinitionModel } from '../../item-definition/itemDefinitionModel';
import { ProgrammedTransformOutputId } from './programmedTransformOutputId';
import { ProgrammedTransformOutputSkeleton } from './programmedTransformOutputSkeleton';

type ProgrammedTransformOutputModelInput = {
  skeleton: ProgrammedTransformOutputSkeleton;
  itemDefinition: ItemDefinitionModel;
};

/**
 * The information needed to present a ProgrammedTransformOutpu in a program
 * model
 */
export class ProgrammedTransformOutputModel
  implements ProgrammedTransformOutputModelInput
{
  get id(): ProgrammedTransformOutputId {
    return this.skeleton.id;
  }

  skeleton: ProgrammedTransformOutputSkeleton;

  itemDefinition: ItemDefinitionModel;

  constructor(input: ProgrammedTransformOutputModelInput) {
    this.skeleton = input.skeleton;
    this.itemDefinition = input.itemDefinition;
  }
}

export const PROGRAMMED_TRANSFORM_OUTPUT_MODEL_COLLECTION_ID =
  'programmed-transform-output-model';

type ProgrammedTransformOutputModelCollectionId =
  typeof PROGRAMMED_TRANSFORM_OUTPUT_MODEL_COLLECTION_ID;

export type ProgrammedTransformOutputModelStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ProgrammedTransformOutputModelCollectionId,
    ProgrammedTransformOutputModel
  >;
