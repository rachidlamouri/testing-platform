import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  DIRECTED_GRAPH_ELEMENT_2_COLLECTION_ID,
  DirectedGraphElement2StreamMetatype,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import {
  GRAPH_ELEMENT_GROUP_COLLECTION_ID,
  GraphElementGroup,
  GraphElementGroupInstance,
  GraphElementGroupStreamMetatype,
} from './graphElementGroup';

/**
 * Consumes the entire collection of graph elements to group them by rootGraphId
 */
export const groupGraphElements = buildProgrammedTransform({
  name: 'groupGraphElements',
})
  .fromCollection2<DirectedGraphElement2StreamMetatype>({
    collectionId: DIRECTED_GRAPH_ELEMENT_2_COLLECTION_ID,
  })
  .toItemTuple2<GraphElementGroupStreamMetatype>({
    collectionId: GRAPH_ELEMENT_GROUP_COLLECTION_ID,
  })
  .onTransform((allGraphElementCollection) => {
    const elementGroupByRootLocatorId = new Map<string, GraphElementGroup>();

    allGraphElementCollection.list.forEach((element) => {
      const key = element.rootGraphLocator.id.forHuman;

      const group =
        elementGroupByRootLocatorId.get(key) ??
        new GraphElementGroupInstance({
          rootGraphLocator: element.rootGraphLocator,
          elementList: [],
        });

      group.elementList.push(element);

      elementGroupByRootLocatorId.set(key, group);
    });

    const outputList = [...elementGroupByRootLocatorId.values()];

    return outputList;
  })
  .assemble();
