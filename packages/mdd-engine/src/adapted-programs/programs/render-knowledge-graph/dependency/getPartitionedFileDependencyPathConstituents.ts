import { ComplexMap } from '../../../../package-agnostic-utilities/data-structure/complexMap';
import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { PartitionFact } from '../partition-fact/partitionFact';
import {
  FILE_DEPENDENCY_PATH_SEGMENT_FACT_COLLECTION_ID,
  FileDependencyPathSegmentFactStreamMetatype,
} from './dependency-path/fileDependencyPathSegmentFact';
import {
  PARTITIONED_FILE_DEPENDENCY_PATH_NODE_COLLECTION_ID,
  PartitionedFileDependencyPathNodeStreamMetatype,
} from './dependency-path/partitionedFileDependencyPathNode';
import { FileDependency } from './fileDependency';
import {
  PARTITIONED_FILE_DEPENDENCY_COLLECTION_ID,
  PartitionedFileDependencyStreamMetatype,
} from './partitionedFileDependency';
import {
  PartitionedFileDependencyGroupConstructorInput,
  PartitionedFileDependencyGroupInstance,
} from './partitionedFileDependencyGroup';

/**
 * Constructs the unique set of PartitionedFileDependencyPathNode and
 * FileDependencyPathSegmentFact objects from all PartitionedFileDependency
 */
export const getPartitionedFileDependencyPathConstituents =
  buildProgrammedTransform({
    name: 'getPartitionedFileDependencyPathConstituents',
  })
    .fromCollection2<PartitionedFileDependencyStreamMetatype>({
      collectionId: PARTITIONED_FILE_DEPENDENCY_COLLECTION_ID,
    })
    .toItemTuple2<PartitionedFileDependencyPathNodeStreamMetatype>({
      collectionId: PARTITIONED_FILE_DEPENDENCY_PATH_NODE_COLLECTION_ID,
    })
    .toItemTuple2<FileDependencyPathSegmentFactStreamMetatype>({
      collectionId: FILE_DEPENDENCY_PATH_SEGMENT_FACT_COLLECTION_ID,
    })
    .onTransform((fileDependencyCollection) => {
      type MappableFileDependency = {
        partitionId: string;
        importedFileId: string;
        partitionFact: PartitionFact;
        fileDependency: FileDependency;
      };

      const keyTemplate = ['partitionId', 'importedFileId'] as const;
      const groupInputByPartitionByImportedFile = new ComplexMap<
        MappableFileDependency,
        PartitionedFileDependencyGroupConstructorInput,
        typeof keyTemplate
      >({
        keyTemplate,
      });

      fileDependencyCollection
        .map<MappableFileDependency>((fileDependency) => {
          return {
            partitionId: fileDependency.partitionFact.id.forHuman,
            importedFileId:
              fileDependency.fileDependency.importedFile.id.forHuman,
            partitionFact: fileDependency.partitionFact,
            fileDependency: fileDependency.fileDependency,
          };
        })
        .forEach((mappableDependency) => {
          const mutableGroupInput =
            groupInputByPartitionByImportedFile.get(mappableDependency) ??
            ({
              partitionFact: mappableDependency.partitionFact,
              fileDependencyList: [],
            } satisfies PartitionedFileDependencyGroupConstructorInput);

          mutableGroupInput.fileDependencyList.push(
            mappableDependency.fileDependency,
          );

          groupInputByPartitionByImportedFile.set(
            mappableDependency,
            mutableGroupInput,
          );
        });

      const groupList = groupInputByPartitionByImportedFile
        .values()
        .map((groupInput) => {
          return new PartitionedFileDependencyGroupInstance(groupInput);
        });

      const partitionedPathNodeSet = groupList.flatMap(
        (group) => group.pathNodeSet,
      );
      const partitionedPathSegmentSet = groupList.flatMap(
        (group) => group.pathSegmentSet,
      );

      return {
        [PARTITIONED_FILE_DEPENDENCY_PATH_NODE_COLLECTION_ID]:
          partitionedPathNodeSet,
        [FILE_DEPENDENCY_PATH_SEGMENT_FACT_COLLECTION_ID]:
          partitionedPathSegmentSet,
      };
    })
    .assemble();
