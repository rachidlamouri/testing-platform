import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { DirectedCluster2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedCluster2';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { THEME } from '../theme';
import {
  DIRECTORY_TO_PARENT_RELATIONSHIP_FACT_GEPP,
  DirectoryToParentRelationshipFactVoque,
} from './directoryToParentRelationshipFact';

/**
 * Gets the directed graph elements for a directory in a boundary
 */
export const getDirectoryGraphElements = buildEstinant({
  name: 'getDirectoryGraphElements',
})
  .fromHubblepup2<DirectoryToParentRelationshipFactVoque>({
    gepp: DIRECTORY_TO_PARENT_RELATIONSHIP_FACT_GEPP,
  })
  .toHubblepup2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((relationshipFact) => {
    const directorySubgraph = new DirectedCluster2Instance({
      locator: relationshipFact.childDirectorySubgraphLocator,
      inputAttributeByKey: {
        label: relationshipFact.childDirectorySubgraphLabel,
        ...THEME.directorySubgraph,
      },
    });

    return directorySubgraph;
  })
  .assemble();
