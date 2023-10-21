import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { ItemDefinitionModel } from '../../item-definition/itemDefinitionModel';
import { ProgrammedTransformInputId } from './programmedTransformInputId';
import { ProgrammedTransformInputSkeleton } from './programmedTransformInputSkeleton';

type ProgrammedTransformInputModelInput = {
  skeleton: ProgrammedTransformInputSkeleton;
  itemDefinition: ItemDefinitionModel;
};

/**
 * The information needed to present a ProgrammedTransformInput in a program
 * model
 */
export class ProgrammedTransformInputModel
  implements ProgrammedTransformInputModelInput
{
  get id(): ProgrammedTransformInputId {
    return this.skeleton.id;
  }

  get index(): number {
    return this.skeleton.index;
  }

  skeleton: ProgrammedTransformInputSkeleton;

  itemDefinition: ItemDefinitionModel;

  constructor(input: ProgrammedTransformInputModelInput) {
    this.skeleton = input.skeleton;
    this.itemDefinition = input.itemDefinition;
  }
}

export const PROGRAMMED_TRANSFORM_INPUT_MODEL_COLLECTION_ID =
  'programmed-transform-input-model';

type ProgrammedTransformInputModelCollectionId =
  typeof PROGRAMMED_TRANSFORM_INPUT_MODEL_COLLECTION_ID;

export type ProgrammedTransformInputModelStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ProgrammedTransformInputModelCollectionId,
    ProgrammedTransformInputModel
  >;
