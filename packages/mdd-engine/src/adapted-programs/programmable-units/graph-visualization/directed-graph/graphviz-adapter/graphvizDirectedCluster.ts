import { SpreadN } from '../../../../../package-agnostic-utilities/type/spreadN';
import { PartialGraphAttributeByKey } from '../directedGraph';
import { DirectedCluster } from '../element/directedCluster';
import { PartialClusterAttributeByKey } from './element-attribute-by-key/partialClusterAttributeByKey';
import {
  GraphvizDirectedGraphLikeInput,
  GraphvizGraphLike,
} from './graphvizDirectedGraphLike';

export type GraphvizDirectedClusterInput = SpreadN<
  [
    {
      cluster: DirectedCluster;
    },
    Pick<
      GraphvizDirectedGraphLikeInput<PartialGraphAttributeByKey>,
      'nodeList' | 'subgraphList'
    >,
  ]
>;

export class GraphvizDirectedCluster extends GraphvizGraphLike<PartialClusterAttributeByKey> {
  sourceCluster: DirectedCluster;

  constructor(input: GraphvizDirectedClusterInput) {
    const attributeByKey: PartialClusterAttributeByKey = {
      id: input.cluster.localIdDigest,
      ...input.cluster.inputAttributeByKey,
    };

    super({
      isRoot: false,
      isCluster: true,
      rankGroupList: null,
      attributeByKey,
      nodeList: input.nodeList,
      edgeList: [],
      subgraphList: input.subgraphList,
    });

    this.sourceCluster = input.cluster;
  }
}
