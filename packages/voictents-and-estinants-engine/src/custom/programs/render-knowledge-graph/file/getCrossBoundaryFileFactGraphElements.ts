import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { DirectedGraphNode2Instance } from '../../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { THEME } from '../theme';
import {
  CROSS_BOUNDARY_FILE_FACT_GEPP,
  CrossBoundaryFileFactVoque,
} from './crossBoundaryFileFact';

export const getCrossBoundaryFileFactGraphElements = buildEstinant({
  name: 'getCrossBoundaryFileFactGraphElements',
})
  .fromHubblepup2<CrossBoundaryFileFactVoque>({
    gepp: CROSS_BOUNDARY_FILE_FACT_GEPP,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((crossBoundaryFileFact) => {
    const node = new DirectedGraphNode2Instance({
      locator: crossBoundaryFileFact.importedFileNodeLocator,
      inputAttributeByKey: {
        // TODO: update file to have an as-is on disk file name
        label: crossBoundaryFileFact.fileFact.file.onDiskFileName.camelCase,
        ...THEME.file,
      },
    });

    return [node];
  })
  .assemble();
