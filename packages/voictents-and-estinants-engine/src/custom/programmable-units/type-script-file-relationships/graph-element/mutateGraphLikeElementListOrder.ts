import { GraphLike } from '../../graph-visualization/directed-graph/graphLike';
import { DirectedGraphMetadataById } from '../../graph-visualization/directedGraphMetadataById';

type IdentifiableElement = { attributeByKey: { id: string; label?: string } };

const compareGraphElements = (
  elementA: IdentifiableElement,
  elementB: IdentifiableElement,
): -1 | 0 | 1 => {
  if (elementA.attributeByKey.id === elementB.attributeByKey.id) {
    return 0;
  }

  if (elementA.attributeByKey.id < elementB.attributeByKey.id) {
    return -1;
  }

  return 1;
};

// TODO: Remove this logic since it has side effects. This is used to help
// measure parity between program modelers with logic that can result in the
// same graph, but with elements defined in a different order
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
  const sortedEntryList = Object.entries(directedGraphById.grition).sort(
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
  directedGraphById.grition = Object.fromEntries(sortedEntryList);
};
