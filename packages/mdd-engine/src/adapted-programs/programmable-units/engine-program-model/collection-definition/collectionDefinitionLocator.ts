import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { ExportLocator, ExportLocatorSubclassInput } from '../exportLocator';
import { CollectionDefinitionId } from './collectionDefinitionId';

type CollectionDefinitionLocatorInput = ExportLocatorSubclassInput;

/**
 * The information needed to find a collection definition
 */
export class CollectionDefinitionLocator extends ExportLocator {
  constructor(input: CollectionDefinitionLocatorInput) {
    const distinguisher = 'CollectionDefinition';

    super({
      IdConstructor: CollectionDefinitionId,
      distinguisher,
      ...input,
    });
  }
}

export const COLLECTION_DEFINITION_LOCATOR_COLLECTION_ID =
  'collection-definition-locator';

type CollectionDefinitionLocatorCollectionId =
  typeof COLLECTION_DEFINITION_LOCATOR_COLLECTION_ID;

export type CollectionDefinitionLocatorStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    CollectionDefinitionLocatorCollectionId,
    CollectionDefinitionLocator
  >;
