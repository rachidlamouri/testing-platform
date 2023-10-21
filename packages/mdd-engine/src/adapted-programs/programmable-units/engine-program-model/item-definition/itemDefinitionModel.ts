import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { ItemDefinitionId } from './itemDefinitionId';
import { ItemDefinitionLocator } from './itemDefinitionLocator';

type ItemModelInput = {
  locator: ItemDefinitionLocator;

  name: string;

  description: string;
};

/**
 * The model of a streamable item independent of any program.
 */
export class ItemDefinitionModel implements ItemModelInput {
  get id(): ItemDefinitionId {
    return this.locator.id;
  }

  locator: ItemDefinitionLocator;

  name: string;

  description: string;

  constructor(input: ItemModelInput) {
    this.locator = input.locator;
    this.name = input.name;
    this.description = input.description;
  }
}

export const ITEM_DEFINITION_MODEL_COLLECTION_ID = 'item-definition-model';

type ItemDefinitionModelCollectionId =
  typeof ITEM_DEFINITION_MODEL_COLLECTION_ID;

export type ItemDefinitionModelStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ItemDefinitionModelCollectionId,
    ItemDefinitionModel
  >;
