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
  .andFromVoictent2<BoundaryAssociationVoque>({
    gepp: BOUNDARY_ASSOCIATION_GEPP,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((boundaryFactList, boundaryAssociationList) => {
    // TODO: remove this hardcoded map
    const boundaryFactByBoundaryZorn = new Map(
      boundaryFactList.map((boundaryFact) => {
        return [boundaryFact.boundary.zorn, boundaryFact] as const;
      }),
    );

    // TODO: remove placeholder nodes
    const associatedBoundaryPlaceholderNodeList = boundaryAssociationList.map(
      (boundaryAssociation) => {
        const referencingBoundaryFact = boundaryFactByBoundaryZorn.get(
          boundaryAssociation.referencingBoundary.zorn,
        );

        assertIsDefined(referencingBoundaryFact);

        return new DirectedGraphNode2Instance({
          locator: new GraphConstituentLocatorInstance({
            rootGraphLocator: referencingBoundaryFact.rootGraphLocator,
            parentId: referencingBoundaryFact.rootGraphLocator.id,
            localZorn: LocalDirectedGraphElement2Zorn.buildNodeZorn({
              distinguisher: boundaryAssociation.referencedBoundary.displayName,
            }),
          }),
          inputAttributeByKey: {
            label: boundaryAssociation.referencedBoundary.displayName,
            ...THEME.file,
          },
        });
      },
    );

    return [
      ...boundaryFactList.map((boundaryFact) => {
        return boundaryFact.directedGraph;
      }),
      // TODO: remove placeholder nodes
      ...associatedBoundaryPlaceholderNodeList,
    ];
  })
  .assemble();
