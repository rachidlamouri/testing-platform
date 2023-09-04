import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { BOUNDARY_FACT_GEPP, BoundaryFactVoque } from './boundary/boundaryFact';

/**
 * Acquires all graph elements (graphs, subgraphs, clusters, nodes, and edges)
 * for the knowlege graph. All "Fact" types should define one graph element.
 */
export const getAllFactGraphElements = buildEstinant({
  name: 'getAllFactGraphElements',
})
  .fromVoictent2<BoundaryFactVoque>({
    gepp: BOUNDARY_FACT_GEPP,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe(() => {
    return [];
  })
  .assemble();
