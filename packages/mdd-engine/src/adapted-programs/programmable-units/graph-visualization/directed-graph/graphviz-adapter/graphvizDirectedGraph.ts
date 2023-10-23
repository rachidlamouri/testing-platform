import { SpreadN } from '../../../../../package-agnostic-utilities/type/spreadN';
import { PartialGraphAttributeByKey } from '../directedGraph';
import { DirectedGraph } from '../element/directedGraph';
import { DirectedGraphId } from '../id/directedGraphId';
import {
  GraphvizDirectedGraphLikeInput,
  GraphvizGraphLike,
} from './graphvizDirectedGraphLike';

export type GraphvizDirectedGraphInput = SpreadN<
  [
    {
      directedGraph: DirectedGraph;
    },
    Pick<
      GraphvizDirectedGraphLikeInput<PartialGraphAttributeByKey>,
      'nodeList' | 'edgeList' | 'subgraphList'
    >,
  ]
>;

export class GraphvizDirectedGraph extends GraphvizGraphLike<PartialGraphAttributeByKey> {
  id: DirectedGraphId;

  sourceGraph: DirectedGraph;

  constructor(input: GraphvizDirectedGraphInput) {
    const attributeByKey: PartialGraphAttributeByKey = {
      id: input.directedGraph.localIdDigest,
      ...input.directedGraph.inputAttributeByKey,
    };

    super({
      isRoot: true,
      isCluster: null,
      rankGroupList: null,
      attributeByKey,
      nodeList: input.nodeList,
      edgeList: input.edgeList,
      subgraphList: input.subgraphList,
    });

    this.id = input.directedGraph.graphId;
    this.sourceGraph = input.directedGraph;
  }
}
