export enum GraphLikeLabelLocation {
  Top = 't',
  Bottom = 'b',
}

export enum GraphLikeStyle {
  Bold = 'bold',
  Rounded = 'rounded',
}

/**
 * Common attributes between Graphs, Subgraphs, and Clusters
 */
export type AttributeByKeyGSC = {
  labelloc: GraphLikeLabelLocation;
  style: GraphLikeStyle;
};
