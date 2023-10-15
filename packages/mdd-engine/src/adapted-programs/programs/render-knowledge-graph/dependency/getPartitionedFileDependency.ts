import { ComplexMap } from '../../../../package-agnostic-utilities/data-structure/complexMap';
import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  FILE_DEPENDENCY_COLLECTION_ID,
  FileDependencyStreamMetatype,
} from './fileDependency';
import {
  PARTITIONED_FILE_DEPENDENCY_COLLECTION_ID,
  PartitionedFileDependencyConstructorInput,
  PartitionedFileDependencyInstance,
  PartitionedFileDependencyStreamMetatype,
} from './partitionedFileDependency';

/**
 * Uses the source partition fact from each file in a FileDependency in order to
 * construct two PartitionedFileDependency objects. Then it deduplicates
 * PartitionedFileDependency objects by the combination of PartitionFact id and
 * FileDependency id
 */
export const getPartitionedFileDependency = buildProgrammedTransform({
  name: 'getPartitionedFileDependency',
})
  .fromCollection2<FileDependencyStreamMetatype>({
    collectionId: FILE_DEPENDENCY_COLLECTION_ID,
  })
  .toItemTuple2<PartitionedFileDependencyStreamMetatype>({
    collectionId: PARTITIONED_FILE_DEPENDENCY_COLLECTION_ID,
  })
  .onTransform((fileDependencyCollection) => {
    type MappableFileDependencyInput = {
      partitionFactId: string;
      fileDependencyId: string;
      fileDependencyInput: PartitionedFileDependencyConstructorInput;
    };

    const mappableFileDependencyInputList =
      fileDependencyCollection.list.flatMap<MappableFileDependencyInput>(
        (fileDependency) => {
          const importingSourcePartition =
            fileDependency.importingFile.sourcePartitionFact;
          const importedSourcePartition =
            fileDependency.importedFile.sourcePartitionFact;

          const firstMappableFileDependencyInput = {
            partitionFactId: importingSourcePartition.id.forHuman,
            fileDependencyId: fileDependency.id.forHuman,
            fileDependencyInput: {
              partitionFact: importingSourcePartition,
              fileDependency,
            },
          } satisfies MappableFileDependencyInput;

          const secondMappableFileDependencyInput = {
            partitionFactId: importedSourcePartition.id.forHuman,
            fileDependencyId: fileDependency.id.forHuman,
            fileDependencyInput: {
              partitionFact: importedSourcePartition,
              fileDependency,
            },
          } satisfies MappableFileDependencyInput;

          return [
            firstMappableFileDependencyInput,
            secondMappableFileDependencyInput,
          ];
        },
      );

    const fileDependencyInputCombination = new ComplexMap({
      keyTemplate: ['partitionFactId', 'fileDependencyId'],
      initialList: mappableFileDependencyInputList.map(
        (fileDependencyInput) => {
          return [fileDependencyInput, fileDependencyInput] as const;
        },
      ),
    });

    const outputList = fileDependencyInputCombination
      .values()
      .map(({ fileDependencyInput }) => {
        return new PartitionedFileDependencyInstance(fileDependencyInput);
      });

    return outputList;
  })
  .assemble();
