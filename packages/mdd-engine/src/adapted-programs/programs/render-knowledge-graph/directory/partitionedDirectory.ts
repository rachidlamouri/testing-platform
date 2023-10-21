import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
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

const PARTITIONED_DIRECTORY_ID_TEMPLATE = [
  ['partitionFact', PartitionFactId],
  ['directory', FileSystemNodeId],
] as const satisfies GenericComplexIdTemplate;
type PartitionedDirectoryIdTemplate = typeof PARTITIONED_DIRECTORY_ID_TEMPLATE;
class PartitionedDirectoryId extends ComplexId<PartitionedDirectoryIdTemplate> {
  get rawTemplate(): PartitionedDirectoryIdTemplate {
    return PARTITIONED_DIRECTORY_ID_TEMPLATE;
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
      id: PartitionedDirectoryId;
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

      const id = new PartitionedDirectoryId({
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

export const PARTITIONED_DIRECTORY_COLLECTION_ID = 'partitioned-directory';

type PartitionedDirectoryCollectionId =
  typeof PARTITIONED_DIRECTORY_COLLECTION_ID;

export type PartitionedDirectoryStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    PartitionedDirectoryCollectionId,
    PartitionedDirectory
  >;
