import { DirectedGraphNode } from '../element/directedGraphNode';
import { DirectedSubgraphLike } from '../element/directedSubgraphLike';

export type SubgroupInput = {
  graphLike: DirectedSubgraphLike;
  nodeList: DirectedGraphNode[];
  subgroupInputList: SubgroupInput[];
};

export class Subgroup implements Omit<SubgroupInput, 'subgroupInputList'> {
  graphLike: DirectedSubgraphLike;

  nodeList: DirectedGraphNode[];

  subgroupList: Subgroup[];

  constructor(input: SubgroupInput) {
    this.graphLike = input.graphLike;
    this.nodeList = input.nodeList;
    this.subgroupList = input.subgroupInputList.map(
      (subinput) => new Subgroup(subinput),
    );
  }
}
