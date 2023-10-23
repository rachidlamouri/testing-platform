import { RootGroup } from '../element-group/rootGroup';
import { Subgroup } from '../element-group/subgroup';
import { isDirectedSubgraph } from '../element/utilities';
import { GraphvizDirectedCluster } from './graphvizDirectedCluster';
import { GraphvizDirectedEdge } from './graphvizDirectedEdge';
import { GraphvizDirectedGraph } from './graphvizDirectedGraph';
import { GraphvizDirectedGraphNode } from './graphvizDirectedGraphNode';
import { GraphvizDirectedSubgraph } from './graphvizDirectedSubgraph';

type BuildGraphvizDirectedGraphInput = {
  rootGroup: RootGroup;
};

const buildSubgraphLike = (
  subgroup: Subgroup,
): GraphvizDirectedSubgraph | GraphvizDirectedCluster => {
  const nodeList = subgroup.nodeList.map(
    (node) => new GraphvizDirectedGraphNode(node),
  );

  const subgraphList = subgroup.subgroupList.map(buildSubgraphLike);

  if (isDirectedSubgraph(subgroup.graphLike)) {
    return new GraphvizDirectedSubgraph({
      subgraph: subgroup.graphLike,
      nodeList,
      subgraphList,
    });
  }

  return new GraphvizDirectedCluster({
    cluster: subgroup.graphLike,
    nodeList,
    subgraphList,
  });
};

/**
 * Constructs a GraphvizDirectedGraph from a tree of custom graph objects
 */
export const buildGraphvizDirectedGraph = ({
  rootGroup,
}: BuildGraphvizDirectedGraphInput): GraphvizDirectedGraph => {
  const nodeList = rootGroup.nodeList.map(
    (node) => new GraphvizDirectedGraphNode(node),
  );

  const edgeList = rootGroup.edgeList.map(
    (edge) => new GraphvizDirectedEdge(edge),
  );

  const subgraphList = rootGroup.subgroupList.map(buildSubgraphLike);

  return new GraphvizDirectedGraph({
    directedGraph: rootGroup.graphLike,
    nodeList,
    edgeList,
    subgraphList,
  });
};
