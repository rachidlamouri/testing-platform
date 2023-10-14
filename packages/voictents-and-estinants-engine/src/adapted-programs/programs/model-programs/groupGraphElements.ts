import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import {
  GRAPH_ELEMENT_GROUP_GEPP,
  GraphElementGroup,
  GraphElementGroupInstance,
  GraphElementGroupVoque,
} from './graphElementGroup';

/**
 * Consumes the entire collection of graph elements to group them by rootGraphId
 */
export const groupGraphElements = buildProgrammedTransform({
  name: 'groupGraphElements',
})
  .fromVoictent2<DirectedGraphElement2Voque>({
    collectionId: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .toItemTuple2<GraphElementGroupVoque>({
    collectionId: GRAPH_ELEMENT_GROUP_GEPP,
  })
  .onTransform((allGraphElementList) => {
    const elementGroupByRootLocatorZorn = new Map<string, GraphElementGroup>();

    allGraphElementList.forEach((element) => {
      const key = element.rootGraphLocator.zorn.forHuman;

      const group =
        elementGroupByRootLocatorZorn.get(key) ??
        new GraphElementGroupInstance({
          rootGraphLocator: element.rootGraphLocator,
          elementList: [],
        });

      group.elementList.push(element);

      elementGroupByRootLocatorZorn.set(key, group);
    });

    const outputList = [...elementGroupByRootLocatorZorn.values()];

    return outputList;
  })
  .assemble();
