import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { Tuple } from '../../../../package-agnostic-utilities/type/tuple';
import { ItemDefinitionModel } from '../item-definition/itemDefinitionModel';
import { ProgrammedTransformInputModel } from './input/programmedTransformInputModel';
import { ProgrammedTransformOutputModel } from './output/programmedTransformOutputModel';
import { ProgrammedTransformId } from './programmedTransformId';
import { ProgrammedTransformSkeleton } from './programmedTransformSkeleton';

type ProgrammedTransformModelInput = {
  skeleton: ProgrammedTransformSkeleton;
  inputModelList: Tuple<ProgrammedTransformInputModel>;
  outputModelList: Tuple<ProgrammedTransformOutputModel>;
};

/**
 * The information needed to present a ProgrammedTransform in a program model
 */
export class ProgrammedTransformModel implements ProgrammedTransformModelInput {
  get id(): ProgrammedTransformId {
    return this.skeleton.id;
  }

  get name(): string {
    return this.skeleton.instantiatedName ?? '';
  }

  get description(): string {
    return this.skeleton.description ?? '';
  }

  skeleton: ProgrammedTransformSkeleton;

  inputModelList: Tuple<ProgrammedTransformInputModel>;

  outputModelList: Tuple<ProgrammedTransformOutputModel>;

  constructor(input: ProgrammedTransformModelInput) {
    this.skeleton = input.skeleton;
    this.inputModelList = input.inputModelList;
    this.outputModelList = input.outputModelList;
  }

  getAllItemDefinitionModelList(): ItemDefinitionModel[] {
    return [
      ...this.inputModelList.map((input) => input.itemDefinition),
      ...this.outputModelList.map((output) => output.itemDefinition),
    ];
  }
}

export const PROGRAMMED_TRANSFORM_MODEL_COLLECTION_ID =
  'programmed-transform-model';

type ProgrammedTransformModelCollectionId =
  typeof PROGRAMMED_TRANSFORM_MODEL_COLLECTION_ID;

export type ProgrammedTransformModelStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ProgrammedTransformModelCollectionId,
    ProgrammedTransformModel
  >;
