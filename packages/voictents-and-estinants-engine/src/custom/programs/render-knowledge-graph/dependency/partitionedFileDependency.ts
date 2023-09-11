import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../utilities/simplify';
import {
  PartitionFact,
  PartitionFactZorn,
} from '../partition-fact/partitionFact';
import { FileDependency } from './fileDependency';
import { FileDependencyZorn } from './fileDependencyZorn';

const PARTITIONED_FILE_DEPENDENCY_ZORN_TEMPLATE = [
  ['partitionFact', PartitionFactZorn],
  ['fileDependency', FileDependencyZorn],
] as const satisfies GenericZorn2Template;
type PartitionedFileDependencyZornTemplate =
  typeof PARTITIONED_FILE_DEPENDENCY_ZORN_TEMPLATE;
class PartitionedFileDependencyZorn extends Zorn2<PartitionedFileDependencyZornTemplate> {
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
export type PartitionedFileDependency = SimplifyN<
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
      typeCheckErrorMesssages: {
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
