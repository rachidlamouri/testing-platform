import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { DirectedGraph2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedGraph2';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { BOUNDARY_GEPP, BoundaryVoque } from './boundary';
import {
  BOUNDARY_FACT_GEPP,
  BoundaryFactInstance,
  BoundaryFactVoque,
} from './boundaryFact';
import { THEME } from '../theme';
import {
  COMMON_BOUNDARY_ROOT_GEPP,
  CommonBoundaryRootVoque,
} from '../common-boundary-root/commonBoundaryRoot';

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
  .andFromHubblepupTuple2<CommonBoundaryRootVoque, ['']>({
    gepp: COMMON_BOUNDARY_ROOT_GEPP,
    // TODO: make a more readable pattern for singleton collections
    framate: () => [''],
    croard: () => '',
  })
  .toHubblepup2<BoundaryFactVoque>({
    gepp: BOUNDARY_FACT_GEPP,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((boundary, [commonBoundaryRoot]) => {
    const boundaryFact = new BoundaryFactInstance({
      boundary,
      commonBoundaryRoot,
    });

    const rootGraph = new DirectedGraph2Instance({
      zorn2: boundaryFact.graphZorn,
      attributeByKey: {
        id: boundaryFact.graphId,
        label: boundary.displayName,
        ...THEME.graph,
      },
      rootGraphLocator: boundaryFact.rootGraphLocator,
    });

    return {
      [BOUNDARY_FACT_GEPP]: boundaryFact,
      [DIRECTED_GRAPH_ELEMENT_2_GEPP]: [rootGraph],
    };
  })
  .assemble();
