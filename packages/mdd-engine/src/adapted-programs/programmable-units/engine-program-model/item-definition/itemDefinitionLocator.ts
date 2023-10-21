import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { ExportLocatorSubclassInput, ExportLocator } from '../exportLocator';
import { StreamMetatypeLocator } from '../stream-metatype/streamMetatypeLocator';
import { ItemDefinitionId } from './itemDefinitionId';

type ItemDefinitionLocatorInput = ExportLocatorSubclassInput;

/**
 * The information needed to find the type or class declaration for an Item
 */
export class ItemDefinitionLocator extends ExportLocator {
  static fromStreamMetatypeLocator(
    streamMetatypeLocator: StreamMetatypeLocator,
  ): ItemDefinitionLocator {
    const itemIdentifierName = streamMetatypeLocator.identifierName
      .replace(/StreamMetatype$/, '')
      // TODO: this one is specifically for GenericProgramError, which is hacky
      .replace(/^Generic/, '');

    return new ItemDefinitionLocator({
      filePath: streamMetatypeLocator.filePath,
      identifierName: itemIdentifierName,
    });
  }

  constructor(input: ItemDefinitionLocatorInput) {
    super({
      IdConstructor: ItemDefinitionId,
      distinguisher: 'ItemDefinition',
      ...input,
    });
  }
}

export const ITEM_DEFINITION_LOCATOR_COLLECTION_ID = 'item-definition-locator';

type ItemDefinitionLocatorCollectionId =
  typeof ITEM_DEFINITION_LOCATOR_COLLECTION_ID;

export type ItemDefinitionLocatorStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ItemDefinitionLocatorCollectionId,
    ItemDefinitionLocator
  >;
