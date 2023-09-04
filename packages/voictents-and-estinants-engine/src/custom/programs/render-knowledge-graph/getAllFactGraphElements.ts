import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { DirectedGraphNode2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { GraphConstituentLocatorInstance } from '../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import { LocalDirectedGraphElement2Zorn } from '../../programmable-units/graph-visualization/directed-graph/types';
import { BOUNDARY_FACT_GEPP, BoundaryFactVoque } from './boundary/boundaryFact';
import { THEME } from './theme';

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
  .onPinbe((boundaryFactList) => {
    return [
      ...boundaryFactList.map((boundaryFact) => {
        return boundaryFact.directedGraph;
      }),
      // TODO: remove placeholder node
      ...boundaryFactList.map((boundaryFact) => {
        return new DirectedGraphNode2Instance({
          locator: new GraphConstituentLocatorInstance({
            rootGraphLocator: boundaryFact.rootGraphLocator,
            parentId: boundaryFact.rootGraphLocator.id,
            localZorn: LocalDirectedGraphElement2Zorn.buildNodeZorn({
              distinguisher: boundaryFact.boundary.displayName,
            }),
          }),
          inputAttributeByKey: {
            label: `${boundaryFact.boundary.displayName}`,
            ...THEME.file,
          },
        });
      }),
    ];
  })
  .assemble();
