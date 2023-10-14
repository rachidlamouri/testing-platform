import { ComplexMap } from '../../../../package-agnostic-utilities/data-structure/complexMap';
import { buildProgrammedTransform } from '../../../../adapter/estinant-builder/buildEstinant';
import { FILE_DEPENDENCY_GEPP, FileDependencyVoque } from './fileDependency';
import {
  PARTITIONED_FILE_DEPENDENCY_GEPP,
  PartitionedFileDependencyConstructorInput,
  PartitionedFileDependencyInstance,
  PartitionedFileDependencyVoque,
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
  .fromCollection2<FileDependencyVoque>({
    collectionId: FILE_DEPENDENCY_GEPP,
  })
  .toItemTuple2<PartitionedFileDependencyVoque>({
    collectionId: PARTITIONED_FILE_DEPENDENCY_GEPP,
  })
  .onTransform((fileDependencyVoictent) => {
    type MappableFileDependencyInput = {
      partitionFactZorn: string;
      fileDependencyZorn: string;
      fileDependencyInput: PartitionedFileDependencyConstructorInput;
    };

    const mappableFileDependencyInputList =
      fileDependencyVoictent.list.flatMap<MappableFileDependencyInput>(
        (fileDependency) => {
          const importingSourcePartition =
            fileDependency.importingFile.sourcePartitionFact;
          const importedSourcePartition =
            fileDependency.importedFile.sourcePartitionFact;

          const firstMappableFileDependencyInput = {
            partitionFactZorn: importingSourcePartition.zorn.forHuman,
            fileDependencyZorn: fileDependency.zorn.forHuman,
            fileDependencyInput: {
              partitionFact: importingSourcePartition,
              fileDependency,
            },
          } satisfies MappableFileDependencyInput;

          const secondMappableFileDependencyInput = {
            partitionFactZorn: importedSourcePartition.zorn.forHuman,
            fileDependencyZorn: fileDependency.zorn.forHuman,
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
      keyTemplate: ['partitionFactZorn', 'fileDependencyZorn'],
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
