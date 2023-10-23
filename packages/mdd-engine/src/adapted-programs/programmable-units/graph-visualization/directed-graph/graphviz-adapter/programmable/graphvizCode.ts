import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { DirectedGraph } from '../../element/directedGraph';
import { DirectedGraphId } from '../../id/directedGraphId';

type GraphvizCodeInput = {
  code: string;
  graph: DirectedGraph;
};

/**
 * See the Graphviz DOT language for more details: https://graphviz.org/doc/info/lang.html
 */
export class GraphvizCode implements GraphvizCodeInput {
  get id(): DirectedGraphId {
    return this.graph.localComplexId;
  }

  code: string;

  graph: DirectedGraph;

  constructor(input: GraphvizCodeInput) {
    this.code = input.code;
    this.graph = input.graph;
  }
}

export const GRAPHVIZ_CODE_COLLECTION_ID = 'graphviz-code';

type GraphvizCodeCollectionId = typeof GRAPHVIZ_CODE_COLLECTION_ID;

export type GraphvizCodeStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    GraphvizCodeCollectionId,
    GraphvizCode
  >;
