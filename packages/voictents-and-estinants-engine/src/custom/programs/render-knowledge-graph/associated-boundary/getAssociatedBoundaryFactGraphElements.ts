import { getZorn } from '../../../../utilities/getZorn';
import { getZornableId } from '../../../../utilities/getZornableId';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { DirectedCluster2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedCluster2';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { DirectedGraphNode2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { GraphConstituentLocatorInstance } from '../../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import { LocalDirectedGraphElement2Zorn } from '../../../programmable-units/graph-visualization/directed-graph/types';
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
      locator: associatedBoundaryFact.subgraphLocator,
      inputAttributeByKey: {
        label:
          associatedBoundaryFact.referencedBoundaryFact.boundary.displayName,
        ...THEME.boundary,
      },
    });

    const placeholderLabel = 'placeholder-node';
    const placeholderNode = new DirectedGraphNode2Instance({
      locator: new GraphConstituentLocatorInstance({
        idOverride: getZornableId({
          zorn: getZorn([associatedBoundaryFact.zorn, 'placeholder-node']),
        }),
        rootGraphLocator: associatedBoundaryFact.rootGraphLocator,
        parentId: associatedBoundarySubgraph.id,
        localZorn: LocalDirectedGraphElement2Zorn.buildNodeZorn({
          distinguisher: getZorn([
            associatedBoundaryFact.zorn,
            placeholderLabel,
          ]),
        }),
      }),
      inputAttributeByKey: {
        label: placeholderLabel,
        ...THEME.file,
      },
    });

    return [associatedBoundarySubgraph, placeholderNode];
  })
  .assemble();
