import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { FACT_GEPP, FactVoque } from './fact/fact';

/**
 * Acquires all graph elements (graphs, subgraphs, clusters, nodes, and edges)
 * for the knowlege graph. All "Fact" types should define one graph element.
 */
export const getAllFactGraphElements = buildProgrammedTransform({
  name: 'getAllFactGraphElements',
})
  .fromCollection2<FactVoque>({
    collectionId: FACT_GEPP,
  })
  .toItemTuple2<DirectedGraphElement2Voque>({
    collectionId: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onTransform((factVoictent) => {
    return factVoictent.graphElementList;
  })
  .assemble();
