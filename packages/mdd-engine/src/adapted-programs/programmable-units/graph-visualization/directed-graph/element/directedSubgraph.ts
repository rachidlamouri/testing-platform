import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { DirectedGraphLikeId } from '../id/derived/directedGraphLikeId';
import { DirectedSubgraphId } from '../id/directedSubgraphId';
import { DirectedSubgraphLocator } from '../locator/directedSubgraphLocator';
import { DirectedGraphElementLocator } from '../locator/directedGraphElementLocator';
import { GlobalDirectedSubgraphId } from '../id/derived/global/globalDirectedSubgraph';
import { PartialSubgraphAttributeByKey } from '../directedSubgraph';

type DirectedSubgraphInput = {
  locator: DirectedSubgraphLocator;
  inputAttributeByKey: Omit<PartialSubgraphAttributeByKey, 'id'>;
  rankGroupList?: string[][];
};

export class DirectedSubgraph extends DirectedGraphElementLocator<
  DirectedSubgraphId,
  DirectedGraphLikeId,
  GlobalDirectedSubgraphId
> {
  inputAttributeByKey: Omit<PartialSubgraphAttributeByKey, 'id'>;

  rankGroupList?: string[][];

  constructor(input: DirectedSubgraphInput) {
    super(input.locator);

    this.inputAttributeByKey = input.inputAttributeByKey;
    this.rankGroupList = input.rankGroupList;
  }
}

export const DIRECTED_SUBGRAPH_COLLECTION_ID = 'directed-subgraph';

type DirectedSubgraphCollectionId = typeof DIRECTED_SUBGRAPH_COLLECTION_ID;

export type DirectedSubgraphStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    DirectedSubgraphCollectionId,
    DirectedSubgraph
  >;
