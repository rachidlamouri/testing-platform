export enum RankDirection {
  TopBottom = 'TB',
  LeftRight = 'LR',
  BottomTop = 'BT',
  RightLeft = 'RL',
}

/**
 * Common attributes between Graphs and Subgraphs
 */
export type AttributeByKeyGS = {
  rankdir: RankDirection;
  nodesep: number;
};
