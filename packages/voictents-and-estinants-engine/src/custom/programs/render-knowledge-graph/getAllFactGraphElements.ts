import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import {
  FILE_DEPENDENCY_GEPP,
  FileDependencyVoque,
} from './dependency/fileDependency';
import {
  DIRECTORY_FACT_2_GEPP,
  DirectoryFact2Voque,
} from './directory/directoryFact2';
import { FILE_FACT_2_GEPP, FileFact2Voque } from './file/fileFact2';
import {
  PARTITION_FACT_GEPP,
  PartitionFactVoque,
} from './partition-fact/partitionFact';
import {
  FILE_DEPENDENCY_PATH_NODE_FACT_GEPP,
  FileDependencyPathNodeFactVoque,
} from './dependency/dependency-path/fileDependencyPathNodeFact';
import {
  FILE_DEPENDENCY_PATH_SEGMENT_FACT_GEPP,
  FileDependencyPathSegmentFactVoque,
} from './dependency/dependency-path/fileDependencyPathSegmentFact';

/**
 * Acquires all graph elements (graphs, subgraphs, clusters, nodes, and edges)
 * for the knowlege graph. All "Fact" types should define one graph element.
 */
export const getAllFactGraphElements = buildEstinant({
  name: 'getAllFactGraphElements',
})
  .fromVoictent2<PartitionFactVoque>({
    gepp: PARTITION_FACT_GEPP,
  })
  .andFromVoictent2<DirectoryFact2Voque>({
    gepp: DIRECTORY_FACT_2_GEPP,
  })
  .andFromVoictent2<FileFact2Voque>({
    gepp: FILE_FACT_2_GEPP,
  })
  .andFromVoictent2<FileDependencyVoque>({
    gepp: FILE_DEPENDENCY_GEPP,
  })
  .andFromVoictent2<FileDependencyPathNodeFactVoque>({
    gepp: FILE_DEPENDENCY_PATH_NODE_FACT_GEPP,
  })
  .andFromVoictent2<FileDependencyPathSegmentFactVoque>({
    gepp: FILE_DEPENDENCY_PATH_SEGMENT_FACT_GEPP,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe(
    (
      partitionFactVoictent,
      directoryFactList,
      fileFactList,
      fileDependencyList,
      fileDependencyPathNodeFactVoictent,
      fileDependencyPathNodeSegmentVoictent,
    ) => {
      const graphElementList = [
        ...partitionFactVoictent.list,
        ...directoryFactList,
        ...fileFactList,
        ...fileDependencyPathNodeFactVoictent,
        ...fileDependencyPathNodeSegmentVoictent,
      ].map((fact) => {
        return fact.graphElement;
      });

      return graphElementList;
    },
  )
  .assemble();
