import { DirectedGraphNode } from '../element/directedGraphNode';
import { DirectedEdge } from '../element/directedEdge';
import { DirectedGraph } from '../element/directedGraph';
import { Subgroup, SubgroupInput } from './subgroup';

export type RootGroupInput = {
  graphLike: DirectedGraph;
  nodeList: DirectedGraphNode[];
  edgeList: DirectedEdge[];
  subgroupInputList: SubgroupInput[];
};

/**
 * Contains all of the nested custom directed graph objects needed to make a
 * graphviz directed graph
 */
export class RootGroup implements Omit<RootGroupInput, 'subgroupInputList'> {
  graphLike: DirectedGraph;

  nodeList: DirectedGraphNode[];

  edgeList: DirectedEdge[];

  subgroupList: Subgroup[];

  constructor(input: RootGroupInput) {
    this.graphLike = input.graphLike;
    this.nodeList = input.nodeList;
    this.edgeList = input.edgeList;
    this.subgroupList = input.subgroupInputList.map(
      (subinput) => new Subgroup(subinput),
    );
  }
}
