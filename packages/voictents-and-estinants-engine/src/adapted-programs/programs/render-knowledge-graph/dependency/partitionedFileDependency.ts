import { InMemoryOdeshin2ListVoque } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import {
  PartitionFact,
  PartitionFactZorn,
} from '../partition-fact/partitionFact';
import { FileDependency } from './fileDependency';
import { FileDependencyZorn } from './fileDependencyZorn';

const PARTITIONED_FILE_DEPENDENCY_ZORN_TEMPLATE = [
  ['partitionFact', PartitionFactZorn],
  ['fileDependency', FileDependencyZorn],
] as const satisfies GenericComplexIdTemplate;
type PartitionedFileDependencyZornTemplate =
  typeof PARTITIONED_FILE_DEPENDENCY_ZORN_TEMPLATE;
class PartitionedFileDependencyZorn extends ComplexId<PartitionedFileDependencyZornTemplate> {
  get rawTemplate(): PartitionedFileDependencyZornTemplate {
    return PARTITIONED_FILE_DEPENDENCY_ZORN_TEMPLATE;
  }
}

export type PartitionedFileDependencyConstructorInput = {
  partitionFact: PartitionFact;
  fileDependency: FileDependency;
};

/**
 * A FileDependency and a partition it will be displayed under. A FileDependency
 * can appear in more than one partition.
 */
type PartitionedFileDependency = SimplifyN<
  [
    {
      zorn: PartitionedFileDependencyZorn;
    },
    PartitionedFileDependencyConstructorInput,
  ]
>;

export const { PartitionedFileDependencyInstance } =
  buildNamedConstructorFunction({
    constructorName: 'PartitionedFileDependencyInstance',
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'zorn',
      'partitionFact',
      'fileDependency',
    ],
  } as const)
    .withTypes<
      PartitionedFileDependencyConstructorInput,
      PartitionedFileDependency
    >({
      typeCheckErrorMessage: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { partitionFact, fileDependency } = input;

        const zorn = new PartitionedFileDependencyZorn({
          partitionFact: partitionFact.zorn,
          fileDependency: fileDependency.zorn,
        });

        return {
          zorn,
          partitionFact,
          fileDependency,
        };
      },
    })
    .assemble();

export const PARTITIONED_FILE_DEPENDENCY_GEPP = 'partitioned-file-dependency';

type PartitionedFileDependencyGepp = typeof PARTITIONED_FILE_DEPENDENCY_GEPP;

export type PartitionedFileDependencyVoque = InMemoryOdeshin2ListVoque<
  PartitionedFileDependencyGepp,
  PartitionedFileDependency
>;
