import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

type RankGroupInput = {
  id: string;
};

export class RankGroup implements RankGroupInput {
  id: string;

  constructor(input: RankGroupInput) {
    this.id = input.id;
  }
}

export const RANK_GROUP_COLLECTION_ID = 'rank-group';

type RankGroupCollectionId = typeof RANK_GROUP_COLLECTION_ID;

export type RankGroupStreamMetatype = InMemoryIdentifiableItem3StreamMetatype<
  RankGroupCollectionId,
  RankGroup
>;
