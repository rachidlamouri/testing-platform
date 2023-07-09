import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { EdgeStyle } from '../../../programmable-units/graph-visualization/directed-graph/directedGraphEdge';
import { DirectedGraphEdge2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedGraphEdge2';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { DEPENDENCY_FACT_GEPP, DependencyFactVoque } from './dependencyFact';

/**
 * Gets the directed graph elements for an import relationship between two
 * TypeScript files within a boundary
 *
 * @note this gets the graph elements for a dependency relationship; not to be confused with getting all "dependency graph" elements.
 */
export const getDependencyGraphElements = buildEstinant({
  name: 'getDependencyGraphElements',
})
  .fromHubblepup2<DependencyFactVoque>({
    gepp: DEPENDENCY_FACT_GEPP,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((dependencyFact) => {
    if (
      dependencyFact.importingFact.directoryFact.boundaryFact.zorn !==
      dependencyFact.importedFact.directoryFact.boundaryFact.zorn
    ) {
      return [];
    }

    const edge = new DirectedGraphEdge2Instance({
      attributeByKey: {
        style: EdgeStyle.Invisible,
      },
      tailId: dependencyFact.tailId,
      headId: dependencyFact.headId,
      rootGraphLocator:
        dependencyFact.importingFact.directoryFact.boundaryFact
          .rootGraphLocator,
    });

    return [edge];
  })
  .assemble();
