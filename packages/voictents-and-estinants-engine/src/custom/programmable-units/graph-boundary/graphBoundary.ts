import { Hubblepup } from '../../adapter/hubblepup';
import { Voictent } from '../../adapter/voictent';

export type GraphBoundary = {
  directoryPath: string;
};

export type GraphBoundaryHubblepup = Hubblepup<GraphBoundary>;

export const GRAPH_BOUNDARY_GEPP = 'graph-boundary';

export type GraphBoundaryGepp = typeof GRAPH_BOUNDARY_GEPP;

export type GraphBoundaryVoictent = Voictent<
  GraphBoundaryGepp,
  GraphBoundaryHubblepup
>;
