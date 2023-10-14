import { ComplexMap } from '../../../../package-agnostic-utilities/data-structure/complexMap';
import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { PartitionFact } from '../partition-fact/partitionFact';
import {
  FILE_DEPENDENCY_PATH_SEGMENT_FACT_COLLECTION_ID,
  FileDependencyPathSegmentFactStreamMetatype,
} from './dependency-path/fileDependencyPathSegmentFact';
import {
  PARTITIONED_FILE_DEPENDENCY_PATH_NODE_GEPP,
  PartitionedFileDependencyPathNodeVoque,
} from './dependency-path/partitionedFileDependencyPathNode';
import { FileDependency } from './fileDependency';
import {
  PARTITIONED_FILE_DEPENDENCY_GEPP,
  PartitionedFileDependencyVoque,
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
    .fromCollection2<PartitionedFileDependencyVoque>({
      collectionId: PARTITIONED_FILE_DEPENDENCY_GEPP,
    })
    .toItemTuple2<PartitionedFileDependencyPathNodeVoque>({
      collectionId: PARTITIONED_FILE_DEPENDENCY_PATH_NODE_GEPP,
    })
    .toItemTuple2<FileDependencyPathSegmentFactStreamMetatype>({
      collectionId: FILE_DEPENDENCY_PATH_SEGMENT_FACT_COLLECTION_ID,
    })
    .onTransform((fileDependencyVoictent) => {
      type MappableFileDependency = {
        partitionZorn: string;
        importedFileZorn: string;
        partitionFact: PartitionFact;
        fileDependency: FileDependency;
      };

      const keyTemplate = ['partitionZorn', 'importedFileZorn'] as const;
      const groupInputByPartitionByImportedFile = new ComplexMap<
        MappableFileDependency,
        PartitionedFileDependencyGroupConstructorInput,
        typeof keyTemplate
      >({
        keyTemplate,
      });

      fileDependencyVoictent
        .map<MappableFileDependency>((fileDependency) => {
          return {
            partitionZorn: fileDependency.partitionFact.id.forHuman,
            importedFileZorn:
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
        [PARTITIONED_FILE_DEPENDENCY_PATH_NODE_GEPP]: partitionedPathNodeSet,
        [FILE_DEPENDENCY_PATH_SEGMENT_FACT_COLLECTION_ID]:
          partitionedPathSegmentSet,
      };
    })
    .assemble();
