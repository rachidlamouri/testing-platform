import { ComplexMap } from '../../../../utilities/complexMap';
import { buildEstinant } from '../../../../adapter/estinant-builder/estinantBuilder';
import { PartitionFact } from '../partition-fact/partitionFact';
import {
  FILE_DEPENDENCY_PATH_SEGMENT_FACT_GEPP,
  FileDependencyPathSegmentFactVoque,
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
export const getPartitionedFileDependencyPathConstituents = buildEstinant({
  name: 'getPartitionedFileDependencyPathConstituents',
})
  .fromVoictent2<PartitionedFileDependencyVoque>({
    gepp: PARTITIONED_FILE_DEPENDENCY_GEPP,
  })
  .toHubblepupTuple2<PartitionedFileDependencyPathNodeVoque>({
    gepp: PARTITIONED_FILE_DEPENDENCY_PATH_NODE_GEPP,
  })
  .toHubblepupTuple2<FileDependencyPathSegmentFactVoque>({
    gepp: FILE_DEPENDENCY_PATH_SEGMENT_FACT_GEPP,
  })
  .onPinbe((fileDependencyVoictent) => {
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
          partitionZorn: fileDependency.partitionFact.zorn.forHuman,
          importedFileZorn:
            fileDependency.fileDependency.importedFile.zorn.forHuman,
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
      [FILE_DEPENDENCY_PATH_SEGMENT_FACT_GEPP]: partitionedPathSegmentSet,
    };
  })
  .assemble();
