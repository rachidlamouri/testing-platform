import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { CollectionDefinitionId } from './collectionDefinitionId';
import { CollectionDefinitionLocator } from './collectionDefinitionLocator';

type CollectionDefinitionModelInput = {
  locator: CollectionDefinitionLocator;
  name: string;
  description: string;
};

/**
 * A model of a collection classe. Instances of this class do not correspond to a
 * program.
 *
 * @todo consider adding a RestrictingStreamMetatype field
 *
 * @todo get the input item, output item, and output collection streamable types
 */
export class CollectionDefinitionModel
  implements CollectionDefinitionModelInput
{
  get id(): CollectionDefinitionId {
    return this.locator.id;
  }

  locator: CollectionDefinitionLocator;

  name: string;

  description: string;

  constructor(input: CollectionDefinitionModelInput) {
    this.locator = input.locator;
    this.name = input.name;
    this.description = input.description;
  }
}

export const COLLECTION_DEFINITION_MODEL_COLLECTION_ID =
  'collection-definition-model';

type CollectionDefinitionModelCollectionId =
  typeof COLLECTION_DEFINITION_MODEL_COLLECTION_ID;

export type CollectionDefinitionModelStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    CollectionDefinitionModelCollectionId,
    CollectionDefinitionModel
  >;
