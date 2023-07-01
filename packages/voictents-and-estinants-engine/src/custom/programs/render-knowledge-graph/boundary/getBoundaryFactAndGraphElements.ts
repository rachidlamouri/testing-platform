import { getZorn } from '../../../../utilities/getZorn';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { DirectedCluster2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedCluster2';
import { DirectedGraph2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedGraph2';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { DirectedGraphNode2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { BOUNDARY_GEPP, BoundaryVoque } from './boundary';
import {
  BOUNDARY_FACT_GEPP,
  BoundaryFactInstance,
  BoundaryFactVoque,
} from './boundaryFact';
import { getTextDigest } from '../../../../utilities/getTextDigest';
import { THEME } from '../theme';

/**
 * Gets all graph metadata and graph nodes for a boundary to help set
 * the parent id of all sub-elements
 */
export const getBoundaryFactAndGraphElements = buildEstinant({
  name: 'getBoundaryFactAndGraphElements',
})
  .fromHubblepup2<BoundaryVoque>({
    gepp: BOUNDARY_GEPP,
  })
  .toHubblepup2<BoundaryFactVoque>({
    gepp: BOUNDARY_FACT_GEPP,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((boundary) => {
    const boundaryFact = new BoundaryFactInstance({
      boundary,
    });

    const rootGraph = new DirectedGraph2Instance({
      zorn2: boundaryFact.graphZorn,
      attributeByKey: {
        id: boundaryFact.graphId,
        ...THEME.graph,
      },
      rootGraphLocator: boundaryFact.rootGraphLocator,
    });

    const boundarySubgraph = new DirectedCluster2Instance({
      zorn: boundaryFact.subgraphZorn,
      attributeByKey: {
        id: boundaryFact.subgraphId,
        label: boundary.displayName,
        ...THEME.boundary,
      },
      rootGraphLocator: boundaryFact.rootGraphLocator,
      parentId: boundaryFact.rootGraphLocator.id,
    });

    // TODO: remove this
    const placeholderNodeZorn = getZorn([
      boundaryFact.zorn,
      'boundary-placeholder',
    ]);
    const placeholderNode = new DirectedGraphNode2Instance({
      zorn2: placeholderNodeZorn,
      attributeByKey: {
        id: getTextDigest(placeholderNodeZorn),
        label: 'boundary-placeholder',
        ...THEME.placeholder,
      },
      rootGraphLocator: boundaryFact.rootGraphLocator,
      parentId: boundarySubgraph.id,
    });

    return {
      [BOUNDARY_FACT_GEPP]: boundaryFact,
      [DIRECTED_GRAPH_ELEMENT_2_GEPP]: [
        rootGraph,
        boundarySubgraph,
        placeholderNode,
      ],
    };
  })
  .assemble();
