import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { CollectionDefinitionLocator } from '../collection-definition/collectionDefinitionLocator';
import { ItemDefinitionLocator } from '../item-definition/itemDefinitionLocator';
import { ProgramLocator } from '../program/programLocator';
import { CollectionInstanceId } from './collectionInstanceId';

type CollectionInstanceModelSkeletonInput = {
  programLocator: ProgramLocator;
  collectionDefinitionLocator: CollectionDefinitionLocator;
  itemDefinitionLocator: ItemDefinitionLocator | null;
};

/**
 * The information needed to tie a collection to a program
 */
export class CollectionInstanceSkeleton
  implements CollectionInstanceModelSkeletonInput
{
  id: CollectionInstanceId;

  programLocator: ProgramLocator;

  collectionDefinitionLocator: CollectionDefinitionLocator;

  itemDefinitionLocator: ItemDefinitionLocator | null;

  constructor(input: CollectionInstanceModelSkeletonInput) {
    this.id = new CollectionInstanceId({
      program: input.programLocator,
      collection: input.collectionDefinitionLocator,
      item: input.itemDefinitionLocator ?? '',
    });
    this.programLocator = input.programLocator;
    this.collectionDefinitionLocator = input.collectionDefinitionLocator;
    this.itemDefinitionLocator = input.itemDefinitionLocator;
  }
}

export const COLLECTION_INSTANCE_SKELETON_COLLECTION_ID =
  'collection-instance-skeleton';

type CollectionInstanceSkeletonCollectionId =
  typeof COLLECTION_INSTANCE_SKELETON_COLLECTION_ID;

export type CollectionInstanceSkeletonStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    CollectionInstanceSkeletonCollectionId,
    CollectionInstanceSkeleton
  >;
