import { getTextDigest } from '../../../../utilities/getTextDigest';
import { getZorn } from '../../../../utilities/getZorn';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { DirectedCluster2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedCluster2';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { DirectedGraphNode2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { DirectedSubgraph2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedSubgraph2';
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
      zorn: directoryFact.subgraphZorn,
      attributeByKey: {
        id: directoryFact.subgraphId,
        label,
        ...THEME.directory,
      },
      rootGraphLocator: directoryFact.boundaryFact.rootGraphLocator,
      parentId,
    });

    // TODO: remove this
    const placeholderNodeZorn = getZorn([
      directoryFact.zorn,
      'directory-placeholder',
    ]);
    const placeholderNode = new DirectedGraphNode2Instance({
      zorn2: placeholderNodeZorn,
      attributeByKey: {
        id: getTextDigest(placeholderNodeZorn),
        label: 'directory-placeholder',
        ...THEME.placeholder,
      },
      rootGraphLocator: directoryFact.boundaryFact.rootGraphLocator,
      parentId: directoryFact.subgraphId,
    });

    return [directorySubgraph, placeholderNode];
  })
  .assemble();
