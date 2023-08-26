import { Tuple } from '../../../../utilities/semantic-types/tuple';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { DirectedGraphEdge2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedGraphEdge2';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { DirectedGraphNode2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import {
  DIRECTORY_FACT_GEPP,
  DirectoryFactVoque,
} from '../directory/directoryFact';
import { THEME } from '../theme';
import {
  INVERTED_DEPENDENCY_GROUP_GEPP,
  InvertedDependencyGroupVoque,
} from './invertedDependencyGroup';

/**
 * Gets the directed graph elements for an import relationship between two
 * TypeScript files within a boundary
 */
export const getInvertedDependencyGraphElements = buildEstinant({
  name: 'getInvertedDependencyGraphElements',
})
  .fromHubblepup2<InvertedDependencyGroupVoque>({
    gepp: INVERTED_DEPENDENCY_GROUP_GEPP,
  })
  .andFromHubblepupTuple2<DirectoryFactVoque, Tuple<string>>({
    gepp: DIRECTORY_FACT_GEPP,
    framate: (group) => {
      return group.hubblepup.dependencyPathNodeFactList.map(
        (fact) => fact.directoryPath,
      );
    },
    croard: (directoryFact) => {
      return directoryFact.hubblepup.directory.directoryPath;
    },
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((group, directoryFactList) => {
    const nodeList = group.dependencyPathNodeFactList.map(
      (pathNodeFact, index) => {
        const directoryFact = directoryFactList[index];

        return new DirectedGraphNode2Instance({
          attributeByKey: {
            id: pathNodeFact.nodeId,
            label: '',
            ...THEME.directoryPathNode,
          },
          rootGraphLocator:
            group.importedFact.directoryFact.boundaryFact.rootGraphLocator,
          parentId: directoryFact.subgraphId,
        });
      },
    );

    const edgeList = group.dependencyPathSegmentFactList.map(
      (pathSegmentFact) => {
        return new DirectedGraphEdge2Instance({
          attributeByKey: {
            ...THEME.dependencyEdge,
          },
          tailId: pathSegmentFact.tailId,
          headId: pathSegmentFact.headId,
          rootGraphLocator:
            group.importedFact.directoryFact.boundaryFact.rootGraphLocator,
        });
      },
    );

    return [...nodeList, ...edgeList];
  })
  .assemble();
