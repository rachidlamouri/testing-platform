import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { DirectedGraphNode2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { GraphConstituentLocatorInstance } from '../../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import {
  ASSOCIATED_BOUNDARY_FACT_GEPP,
  AssociatedBoundaryFactVoque,
} from '../associated-boundary/associatedBoundaryFact';
import { THEME } from '../theme';
import { FILE_FACT_GEPP, FileFactVoque } from './fileFact';

/**
 * Creates a node for every associated file fact
 */
export const getAssociatedFileGraphElements = buildEstinant({
  name: 'getAssociatedFileGraphElements',
})
  .fromHubblepup2<AssociatedBoundaryFactVoque>({
    gepp: ASSOCIATED_BOUNDARY_FACT_GEPP,
  })
  .andFromVoictent2<FileFactVoque>({
    gepp: FILE_FACT_GEPP,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((associatedBoundaryFact, fileFactList) => {
    const associatedFileFactList = fileFactList.filter((fileFact) => {
      return (
        fileFact.directoryFact.boundaryFact.zorn ===
        associatedBoundaryFact.referencedBoundaryFact.zorn
      );
    });

    const nodeList = associatedFileFactList.map((fileFact) => {
      const node = new DirectedGraphNode2Instance({
        locator: new GraphConstituentLocatorInstance({
          idOverride: fileFact.nodeLocator.idOverride,
          rootGraphLocator:
            associatedBoundaryFact.referencingBoundaryFact.rootGraphLocator,
          parentId: associatedBoundaryFact.subgraphLocator.id,
          localZorn: fileFact.nodeLocator.localZorn,
        }),
        inputAttributeByKey: {
          // TODO: update file to have an as-is on disk file name
          label: fileFact.file.onDiskFileName.camelCase,
          ...THEME.file,
        },
      });

      return node;
    });

    return nodeList;
  })
  .assemble();
