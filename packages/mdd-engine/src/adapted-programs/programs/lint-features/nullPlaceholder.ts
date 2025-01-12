import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

type NullPlaceholderInput = {
  id: string;
};

/**
 * A singleton for transforms that don't need an input
 */
export class NullPlaceholder implements NullPlaceholderInput {
  id: string;

  constructor(input: NullPlaceholderInput) {
    this.id = input.id;
  }
}

export const NULL_PLACEHOLDER_COLLECTION_ID = 'null-placeholder';

type NullPlaceholderCollectionId = typeof NULL_PLACEHOLDER_COLLECTION_ID;

export type NullPlaceholderStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    NullPlaceholderCollectionId,
    NullPlaceholder
  >;
