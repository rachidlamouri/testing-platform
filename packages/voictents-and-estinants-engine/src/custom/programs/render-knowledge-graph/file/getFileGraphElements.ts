import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { DirectedGraphNode2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { THEME } from '../theme';
import { FILE_FACT_GEPP, FileFactVoque } from './fileFact';

/**
 * Gets the directed graph elements for a file in a boundary under a parent
 * directory
 */
export const getFileGraphElements = buildEstinant({
  name: 'getFileGraphElements',
})
  .fromHubblepup2<FileFactVoque>({
    gepp: FILE_FACT_GEPP,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((fileFact) => {
    const node = new DirectedGraphNode2Instance({
      locator: fileFact.nodeLocator,
      inputAttributeByKey: {
        // TODO: update file to have an as-is on disk file name
        label: fileFact.file.onDiskFileName.camelCase,
        ...THEME.file,
      },
    });

    return [node];
  })
  .assemble();
