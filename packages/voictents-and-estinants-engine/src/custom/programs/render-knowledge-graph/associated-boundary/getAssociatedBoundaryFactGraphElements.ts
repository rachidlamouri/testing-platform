import { getZorn } from '../../../../utilities/getZorn';
import { getZornableId } from '../../../../utilities/getZornableId';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { DirectedCluster2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedCluster2';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { DirectedGraphNode2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { THEME } from '../theme';
import {
  ASSOCIATED_BOUNDARY_FACT_GEPP,
  AssociatedBoundaryFactVoque,
} from './associatedBoundaryFact';

/**
 * Creates the subgraph for a boundary within another boundary's graph
 */
export const getAssociatedBoundaryFactGraphElements = buildEstinant({
  name: 'getAssociatedBoundaryFactGraphElements',
})
  .fromHubblepup2<AssociatedBoundaryFactVoque>({
    gepp: ASSOCIATED_BOUNDARY_FACT_GEPP,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((associatedBoundaryFact) => {
    const associatedBoundarySubgraph = new DirectedCluster2Instance({
      zorn: associatedBoundaryFact.subgraphZorn,
      attributeByKey: {
        id: associatedBoundaryFact.subgraphId,
        label:
          associatedBoundaryFact.referencedBoundaryFact.boundary.displayName,
        ...THEME.boundary,
      },
      rootGraphLocator: associatedBoundaryFact.rootGraphLocator,
      parentId: associatedBoundaryFact.rootGraphLocator.id,
    });

    const placeholderNode = new DirectedGraphNode2Instance({
      attributeByKey: {
        id: getZornableId({
          zorn: getZorn([associatedBoundaryFact.zorn, 'placeholder-node']),
        }),
        label: 'placeholder',
        ...THEME.file,
      },
      rootGraphLocator: associatedBoundaryFact.rootGraphLocator,
      parentId: associatedBoundaryFact.subgraphId,
    });

    return [associatedBoundarySubgraph, placeholderNode];
  })
  .assemble();
