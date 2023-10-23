import { SpreadN } from '../../../../../package-agnostic-utilities/type/spreadN';
import { PartialGraphAttributeByKey } from '../directedGraph';
import { DirectedSubgraph } from '../element/directedSubgraph';
import { PartialSubgraphAttributeByKey } from './element-attribute-by-key/partialSubgraphAttributeByKey';
import {
  GraphvizDirectedGraphLikeInput,
  GraphvizGraphLike,
} from './graphvizDirectedGraphLike';

type GraphvizDirectedSubgraphInput = SpreadN<
  [
    {
      subgraph: DirectedSubgraph;
      rankGroupList?: string[][];
    },
    Pick<
      GraphvizDirectedGraphLikeInput<PartialGraphAttributeByKey>,
      'nodeList' | 'subgraphList'
    >,
  ]
>;

export class GraphvizDirectedSubgraph extends GraphvizGraphLike<PartialSubgraphAttributeByKey> {
  sourceSubgraph: DirectedSubgraph;

  constructor(input: GraphvizDirectedSubgraphInput) {
    const attributeByKey: PartialSubgraphAttributeByKey = {
      id: input.subgraph.localIdDigest,
      ...input.subgraph.inputAttributeByKey,
    };

    super({
      isRoot: false,
      isCluster: false,
      rankGroupList: input.rankGroupList ?? null,
      attributeByKey,
      nodeList: input.nodeList,
      edgeList: [],
      subgraphList: input.subgraphList,
    });

    this.sourceSubgraph = input.subgraph;
  }
}
