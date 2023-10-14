import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { FileSystemNodeId } from '../../../programmable-units/file/fileSystemNode';
import {
  PartitionFact,
  PartitionFactId,
} from '../partition-fact/partitionFact';
import { BoundedDirectory } from './boundedDirectory';

const PARTITIONED_DIRECTORY_ZORN_TEMPLATE = [
  ['partitionFact', PartitionFactId],
  ['directory', FileSystemNodeId],
] as const satisfies GenericComplexIdTemplate;
type PartitionedDirectoryZornTemplate =
  typeof PARTITIONED_DIRECTORY_ZORN_TEMPLATE;
class PartitionedDirectoryZorn extends ComplexId<PartitionedDirectoryZornTemplate> {
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
      id: PartitionedDirectoryZorn;
    },
    PartitionedDirectoryConstructorInput,
  ]
>;

export const { PartitionedDirectoryInstance } = buildNamedConstructorFunction({
  constructorName: 'PartitionedDirectoryInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'id',
    'partitionFact',
    'directory',
  ],
} as const)
  .withTypes<PartitionedDirectoryConstructorInput, PartitionedDirectory>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { partitionFact, directory } = input;

      const id = new PartitionedDirectoryZorn({
        partitionFact: partitionFact.id,
        directory: directory.id,
      });

      return {
        id,
        partitionFact,
        directory,
      };
    },
  })
  .assemble();

export const PARTITIONED_DIRECTORY_GEPP = 'partitioned-directory';

type PartitionedDirectoryGepp = typeof PARTITIONED_DIRECTORY_GEPP;

export type PartitionedDirectoryVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    PartitionedDirectoryGepp,
    PartitionedDirectory
  >;
