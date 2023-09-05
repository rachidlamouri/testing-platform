import { assertIsDefined } from '../../../utilities/assertIsDefined';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { DirectedGraphNode2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { GraphConstituentLocatorInstance } from '../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import { LocalDirectedGraphElement2Zorn } from '../../programmable-units/graph-visualization/directed-graph/types';
import {
  BOUNDARY_ASSOCIATION_GEPP,
  BoundaryAssociationVoque,
} from './boundary/boundaryAssociation';
import { BOUNDARY_FACT_GEPP, BoundaryFactVoque } from './boundary/boundaryFact';
import {
  DIRECTORY_FACT_2_GEPP,
  DirectoryFact2Voque,
} from './directory/directoryFact2';
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
  .andFromVoictent2<DirectoryFact2Voque>({
    gepp: DIRECTORY_FACT_2_GEPP,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((boundaryFactList, directoryFactList) => {
    // TODO: remove placeholder nodes
    const directoryFactPlaceholderNodeList = directoryFactList.map(
      (directoryFact) => {
        return new DirectedGraphNode2Instance({
          locator: new GraphConstituentLocatorInstance({
            rootGraphLocator: directoryFact.boundaryFact.rootGraphLocator,
            parentId: directoryFact.subgraph.id,
            localZorn: LocalDirectedGraphElement2Zorn.buildNodeZorn({
              distinguisher:
                directoryFact.boundedDirectory.directory.zorn.forMachine,
            }),
          }),
          inputAttributeByKey: {
            label: '',
            ...THEME.directoryPathNode,
          },
        });
      },
    );

    return [
      ...boundaryFactList.map((boundaryFact) => {
        return boundaryFact.directedGraph;
      }),
      ...directoryFactList.map((directoryFact) => {
        return directoryFact.subgraph;
      }),
      // TODO: remove placeholder nodes
      ...directoryFactPlaceholderNodeList,
    ];
  })
  .assemble();
