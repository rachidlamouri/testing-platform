import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { DirectedGraphEdge2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge2';
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
import { assertNotUndefined } from '../../../utilities/assertNotUndefined';

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
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe(
    (
      partitionFactVoictent,
      directoryFactList,
      fileFactList,
      fileDependencyList,
    ) => {
      const partitionFactByBoundaryZorn = new Map(
        partitionFactVoictent.list.map((partitionFact) => {
          return [partitionFact.boundary.zorn.forHuman, partitionFact] as const;
        }),
      );

      const placeholderEdgeList = fileDependencyList.flatMap(
        ({ importingFile, importedFile }) => {
          const tailId = importingFile.localGraphElementZorn.forMachine;
          const headId = importedFile.localGraphElementZorn.forMachine;

          const firstPartition = partitionFactByBoundaryZorn.get(
            importingFile.boundary.zorn.forHuman,
          );
          const secondPartition = partitionFactByBoundaryZorn.get(
            importedFile.boundary.zorn.forHuman,
          );

          assertNotUndefined(firstPartition);
          assertNotUndefined(secondPartition);

          const firstEdge = new DirectedGraphEdge2Instance({
            rootGraphLocator: firstPartition.rootGraphLocator,
            tailId,
            headId,
          });

          const secondEdge = new DirectedGraphEdge2Instance({
            rootGraphLocator: secondPartition.rootGraphLocator,
            tailId,
            headId,
          });

          if (firstPartition.zorn.forHuman === secondPartition.zorn.forHuman) {
            return [firstEdge];
          }

          return [firstEdge, secondEdge];
        },
      );

      const graphElementList = [
        ...partitionFactVoictent.list,
        ...directoryFactList,
        ...fileFactList,
      ].map((fact) => {
        return fact.graphElement;
      });

      return [...graphElementList, ...placeholderEdgeList];
    },
  )
  .assemble();
