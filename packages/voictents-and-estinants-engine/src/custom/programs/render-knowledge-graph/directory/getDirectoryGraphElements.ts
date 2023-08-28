import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { DirectedCluster2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedCluster2';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { DirectedSubgraph2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedSubgraph2';
import { GraphConstituentLocatorInstance } from '../../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import { LocalDirectedGraphElement2Zorn } from '../../../programmable-units/graph-visualization/directed-graph/types';
import { THEME } from '../theme';
import { DIRECTORY_FACT_GEPP, DirectoryFactVoque } from './directoryFact';

/**
 * Gets the directed graph elements for a directory in a boundary
 */
export const getDirectoryGraphElements = buildEstinant({
  name: 'getDirectoryGraphElements',
})
  .fromHubblepup2<DirectoryFactVoque>({
    gepp: DIRECTORY_FACT_GEPP,
  })
  .andFromHubblepupTuple2<DirectoryFactVoque, [] | [string]>({
    gepp: DIRECTORY_FACT_GEPP,
    framate: (directoryFact) => {
      if (directoryFact.hubblepup.isBoundaryDirectory) {
        return [];
      }

      return [directoryFact.hubblepup.directory.parentDirectoryPath];
    },

    croard: (directoryFact) => {
      return directoryFact.hubblepup.directory.directoryPath;
    },
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((directoryFact, [parentDirectoryFact]) => {
    // TODO: if you build a directory relationship fact then you can contain this logic in that fact
    let parentId: string;
    let SubgraphLikeConstructor:
      | typeof DirectedSubgraph2Instance
      | typeof DirectedCluster2Instance;
    let label: string;
    if (parentDirectoryFact === undefined) {
      parentId = directoryFact.boundaryFact.rootGraphLocator.id;
      SubgraphLikeConstructor = DirectedCluster2Instance;
      // SubgraphLikeConstructor = DirectedSubgraph2Instance;
      label = `${directoryFact.boundaryFact.directoryPathRelativeToCommonBoundary}/`;
    } else {
      parentId = parentDirectoryFact.subgraphId;
      SubgraphLikeConstructor = DirectedCluster2Instance;
      label = `${directoryFact.directoryPathRelativeToParentDirectory}/`;
    }

    const directorySubgraph = new SubgraphLikeConstructor({
      locator: new GraphConstituentLocatorInstance({
        idOverride: directoryFact.subgraphId,
        localZorn: LocalDirectedGraphElement2Zorn.buildClusterZorn({
          distinguisher: directoryFact.subgraphZorn,
        }),
        rootGraphLocator: directoryFact.boundaryFact.rootGraphLocator,
        parentId,
      }),
      inputAttributeByKey: {
        label,
        ...THEME.directorySubgraph,
      },
    });

    const pathNodeSubgraph = new DirectedCluster2Instance({
      locator: new GraphConstituentLocatorInstance({
        idOverride: directoryFact.pathNodeSubgraphId,
        localZorn: LocalDirectedGraphElement2Zorn.buildClusterZorn({
          distinguisher: directoryFact.pathNodeSubgraphZorn,
        }),
        rootGraphLocator: directoryFact.boundaryFact.rootGraphLocator,
        parentId: directoryFact.subgraphId,
      }),
      inputAttributeByKey: {
        label: '',
        ...THEME.directorySubgraph,
      },
    });

    return [directorySubgraph, pathNodeSubgraph];
  })
  .assemble();
