import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { ProgrammedTransformInputSkeleton } from './input/programmedTransformInputSkeleton';
import { ProgrammedTransformOutputSkeleton } from './output/programmedTransformOutputSkeleton';
import { ProgrammedTransformId } from './programmedTransformId';
import { ProgrammedTransformLocator } from './programmedTransformLocator';

type ProgrammedTransformSkeletonInput = {
  locator: ProgrammedTransformLocator;
  instantiatedName: string | null;
  description: string | null;
  inputSkeletonList: ProgrammedTransformInputSkeleton[];
  outputSkeletonList: ProgrammedTransformOutputSkeleton[];
};

export class ProgrammedTransformSkeleton
  implements ProgrammedTransformSkeletonInput
{
  get id(): ProgrammedTransformId {
    return this.locator.id;
  }

  locator: ProgrammedTransformLocator;

  instantiatedName: string | null;

  description: string | null;

  inputSkeletonList: ProgrammedTransformInputSkeleton[];

  outputSkeletonList: ProgrammedTransformOutputSkeleton[];

  constructor(input: ProgrammedTransformSkeletonInput) {
    this.locator = input.locator;
    this.instantiatedName = input.instantiatedName;
    this.description = input.description;
    this.inputSkeletonList = input.inputSkeletonList;
    this.outputSkeletonList = input.outputSkeletonList;
  }
}

export const PROGRAMMED_TRANSFORM_SKELETON_COLLECTION_ID =
  'programmed-transform-skeleton';

type ProgrammedTransformSkeletonCollectionId =
  typeof PROGRAMMED_TRANSFORM_SKELETON_COLLECTION_ID;

export type ProgrammedTransformSkeletonStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ProgrammedTransformSkeletonCollectionId,
    ProgrammedTransformSkeleton
  >;
