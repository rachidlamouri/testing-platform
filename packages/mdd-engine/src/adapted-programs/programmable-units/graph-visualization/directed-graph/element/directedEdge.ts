import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { PartialEdgeAttributeByKey } from '../directedGraphEdge';
import { DirectedEdgeId } from '../id/directedEdgeId';
import { DirectedGraphId } from '../id/directedGraphId';
import { DirectedGraphElementLocator } from '../locator/directedGraphElementLocator';
import { GlobalDirectedEdgeId } from '../id/derived/global/globalDirectedEdge';
import { DirectedGraphNode } from './directedGraphNode';
import { Source } from '../../../linting/source/source';
import { IdLike } from '../../../../../package-agnostic-utilities/data-structure/id';
import { DirectedGraphLocator } from '../locator/directedGraphLocator';

type DirectedEdgeInput = {
  graphLocator: DirectedGraphLocator;
  tail: DirectedGraphNode;
  head: DirectedGraphNode;
  source: Source;
  distinguisher?: IdLike;
  attributeByKey?: Omit<PartialEdgeAttributeByKey, 'id'>;
};

export class DirectedEdge extends DirectedGraphElementLocator<
  DirectedEdgeId,
  DirectedGraphId,
  GlobalDirectedEdgeId
> {
  tail: DirectedGraphNode;

  head: DirectedGraphNode;

  attributeByKey: Omit<PartialEdgeAttributeByKey, 'id'>;

  constructor(input: DirectedEdgeInput) {
    const tailId = input.tail.localComplexId;
    const headId = input.head.localComplexId;
    const { graphId } = input.graphLocator;

    const localId = new DirectedEdgeId({
      tailId,
      headId,
      source: input.source,
      distinguisher: input.distinguisher ?? '',
    });

    const globalId = new GlobalDirectedEdgeId({
      graph: graphId,
      local: localId,
    });

    super({
      source: input.source,
      localComplexId: localId,
      parentComplexId: graphId,
      graphId,
      globalId,
    });

    this.tail = input.tail;
    this.head = input.head;
    this.attributeByKey = input.attributeByKey ?? {};
  }
}

export const DIRECTED_EDGE_COLLECTION_ID = 'directed-edge';

type DirectedEdgeCollectionId = typeof DIRECTED_EDGE_COLLECTION_ID;

export type DirectedEdgeStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    DirectedEdgeCollectionId,
    DirectedEdge
  >;
