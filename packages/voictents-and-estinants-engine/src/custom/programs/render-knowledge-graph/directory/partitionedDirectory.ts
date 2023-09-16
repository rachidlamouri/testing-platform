import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../utilities/simplify';
import { FileSystemNodeZorn } from '../../../programmable-units/file/fileSystemNode';
import {
  PartitionFact,
  PartitionFactZorn,
} from '../partition-fact/partitionFact';
import { BoundedDirectory } from './boundedDirectory';

const PARTITIONED_DIRECTORY_ZORN_TEMPLATE = [
  ['partitionFact', PartitionFactZorn],
  ['directory', FileSystemNodeZorn],
] as const satisfies GenericZorn2Template;
type PartitionedDirectoryZornTemplate =
  typeof PARTITIONED_DIRECTORY_ZORN_TEMPLATE;
class PartitionedDirectoryZorn extends Zorn2<PartitionedDirectoryZornTemplate> {
  get rawTemplate(): PartitionedDirectoryZornTemplate {
    return PARTITIONED_DIRECTORY_ZORN_TEMPLATE;
  }
}

type PartitionedDirectoryConstructorInput = {
  partitionFact: PartitionFact;
  directory: BoundedDirectory;
};

/**
 * A bounded directory and a partition it should appear under. There can be
 * multiple partitioned directories for the same directory.
 */
type PartitionedDirectory = SimplifyN<
  [
    {
      zorn: PartitionedDirectoryZorn;
    },
    PartitionedDirectoryConstructorInput,
  ]
>;

export const { PartitionedDirectoryInstance } = buildNamedConstructorFunction({
  constructorName: 'PartitionedDirectoryInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'partitionFact',
    'directory',
  ],
} as const)
  .withTypes<PartitionedDirectoryConstructorInput, PartitionedDirectory>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { partitionFact, directory } = input;

      const zorn = new PartitionedDirectoryZorn({
        partitionFact: partitionFact.zorn,
        directory: directory.zorn,
      });

      return {
        zorn,
        partitionFact,
        directory,
      };
    },
  })
  .assemble();

export const PARTITIONED_DIRECTORY_GEPP = 'partitioned-directory';

type PartitionedDirectoryGepp = typeof PARTITIONED_DIRECTORY_GEPP;

export type PartitionedDirectoryVoque = InMemoryOdeshin2ListVoque<
  PartitionedDirectoryGepp,
  PartitionedDirectory
>;