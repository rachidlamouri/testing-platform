import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { CollectionDefinitionModel } from '../collection-definition/collectionDefinitionModel';
import { ItemDefinitionModel } from '../item-definition/itemDefinitionModel';
import { ProgramLocator } from '../program/programLocator';
import { CollectionInstanceId } from './collectionInstanceId';

type CollectionInstanceModelInput = {
  programLocator: ProgramLocator;
  collectionDefinition: CollectionDefinitionModel;
  item: ItemDefinitionModel;
};

/**
 * The model of a collection, its items, and the program it is instantiated in.
 */
export class CollectionInstanceModel implements CollectionInstanceModelInput {
  id: CollectionInstanceId;

  programLocator: ProgramLocator;

  collectionDefinition: CollectionDefinitionModel;

  item: ItemDefinitionModel;

  constructor(input: CollectionInstanceModelInput) {
    this.id = new CollectionInstanceId({
      program: input.programLocator,
      collection: input.collectionDefinition,
      item: input.item,
    });
    this.programLocator = input.programLocator;
    this.collectionDefinition = input.collectionDefinition;
    this.item = input.item;
  }
}

export const COLLECTION_INSTANCE_MODEL_COLLECTION_ID =
  'collection-instance-model';

type CollectionInstanceModelCollectionId =
  typeof COLLECTION_INSTANCE_MODEL_COLLECTION_ID;

export type CollectionInstanceModelStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    CollectionInstanceModelCollectionId,
    CollectionInstanceModel
  >;
