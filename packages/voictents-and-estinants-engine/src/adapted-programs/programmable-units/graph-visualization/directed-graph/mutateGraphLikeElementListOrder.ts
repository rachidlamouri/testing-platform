import { GraphLike } from './graphLike';
import { DirectedGraphMetadataById } from '../directedGraphMetadataById';

type IdentifiableElement = { attributeByKey: { id: string; label?: string } };

const compareGraphElements = (
  elementA: IdentifiableElement,
  elementB: IdentifiableElement,
): -1 | 0 | 1 => {
  if (elementA.attributeByKey.id < elementB.attributeByKey.id) {
    return -1;
  }

  if (elementA.attributeByKey.id === elementB.attributeByKey.id) {
    return 0;
  }

  return 1;
};

/**
 * This is used to help measure parity between program modelers with logic that
 * can result in the same graph, but with elements defined in a different order
 *
 * @todo Remove this logic since it has side effects, and we finished remodeling
 * the program modeler months ago
 */
export const mutateGraphLikeElementListOrder = (graphLike: GraphLike): void => {
  graphLike.nodeList.sort(compareGraphElements);
  graphLike.subgraphList.sort(compareGraphElements);
  graphLike.edgeList.sort((edgeA, edgeB) => {
    if (edgeA.tailId === edgeB.tailId) {
      if (edgeA.headId === edgeB.headId) {
        return 0;
      }
      if (edgeA.headId < edgeB.headId) {
        return -1;
      }
      return 1;
    }
    if (edgeA.tailId < edgeB.tailId) {
      return -1;
    }
    return 1;
  });

  graphLike.subgraphList.forEach(mutateGraphLikeElementListOrder);
};

export const mutateDirectedGraphMetadataById = (
  directedGraphById: DirectedGraphMetadataById,
): void => {
  const sortedEntryList = Object.entries(directedGraphById.subitem).sort(
    ([keyA], [keyB]) => {
      if (keyA < keyB) {
        return -1;
      }

      if (keyA === keyB) {
        return 0;
      }

      return 1;
    },
  );

  // eslint-disable-next-line no-param-reassign
  directedGraphById.subitem = Object.fromEntries(sortedEntryList);
};
