import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  DIRECTED_GRAPH_ELEMENT_2_COLLECTION_ID,
  DirectedGraphElement2StreamMetatype,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { FACT_COLLECTION_ID, FactStreamMetatype } from './fact/fact';

/**
 * Acquires all graph elements (graphs, subgraphs, clusters, nodes, and edges)
 * for the knowlege graph. All "Fact" types should define one graph element.
 */
export const getAllFactGraphElements = buildProgrammedTransform({
  name: 'getAllFactGraphElements',
})
  .fromCollection2<FactStreamMetatype>({
    collectionId: FACT_COLLECTION_ID,
  })
  .toItemTuple2<DirectedGraphElement2StreamMetatype>({
    collectionId: DIRECTED_GRAPH_ELEMENT_2_COLLECTION_ID,
  })
  .onTransform((factCollection) => {
    return factCollection.graphElementList;
  })
  .assemble();
