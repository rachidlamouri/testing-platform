import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { CollectionDefinitionLocator } from '../collection-definition/collectionDefinitionLocator';
import { CollectionInstanceSkeleton } from '../collection-instance/collectionInstanceSkeleton';
import { ProgrammedTransformLocator } from '../programmed-transform/programmedTransformLocator';
import { ProgramId } from './programId';
import { ProgramLocator } from './programLocator';

type ProgramSkeletonInput = {
  programLocator: ProgramLocator;
  collectionDefinitionLocatorList: CollectionDefinitionLocator[];
  collectionInstanceSkeletonList: CollectionInstanceSkeleton[];
  programmedTransformLocatorList: ProgrammedTransformLocator[];
};

export class ProgramSkeleton implements ProgramSkeletonInput {
  get id(): ProgramId {
    return this.programLocator.id;
  }

  programLocator: ProgramLocator;

  collectionDefinitionLocatorList: CollectionDefinitionLocator[];

  collectionInstanceSkeletonList: CollectionInstanceSkeleton[];

  programmedTransformLocatorList: ProgrammedTransformLocator[];

  constructor(input: ProgramSkeletonInput) {
    this.programLocator = input.programLocator;
    this.collectionDefinitionLocatorList =
      input.collectionDefinitionLocatorList;
    this.collectionInstanceSkeletonList = input.collectionInstanceSkeletonList;
    this.programmedTransformLocatorList = input.programmedTransformLocatorList;
  }
}

export const PROGRAM_SKELETON_COLLECTION_ID = 'program-skeleton';

type ProgramSkeletonCollectionId = typeof PROGRAM_SKELETON_COLLECTION_ID;

export type ProgramSkeletonStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ProgramSkeletonCollectionId,
    ProgramSkeleton
  >;
