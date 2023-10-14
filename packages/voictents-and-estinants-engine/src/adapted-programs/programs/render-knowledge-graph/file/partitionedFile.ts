import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { FilePath } from '../../../programmable-units/file/filePath';
import { FileSystemNodeId } from '../../../programmable-units/file/fileSystemNode';
import {
  PartitionFact,
  PartitionFactId,
} from '../partition-fact/partitionFact';
import { BoundedFile } from './boundedFile';

const PARTITIONED_FILE_ID_TEMPLATE = [
  ['partitionFact', PartitionFactId],
  ['file', FileSystemNodeId],
] as const satisfies GenericComplexIdTemplate;
type PartitionedFileIdTemplate = typeof PARTITIONED_FILE_ID_TEMPLATE;
class PartitionedFileId extends ComplexId<PartitionedFileIdTemplate> {
  get rawTemplate(): PartitionedFileIdTemplate {
    return PARTITIONED_FILE_ID_TEMPLATE;
  }
}

type PartitionedFileConstructorInput = {
  partitionFact: PartitionFact;
  file: BoundedFile;
};

/**
 * A bounded file and a partition it should appear under. There can be
 * multiple partitioned files for the same file.
 */
type PartitionedFile = SimplifyN<
  [
    {
      id: PartitionedFileId;
    },
    PartitionedFileConstructorInput,
    {
      nodePath: FilePath;
    },
  ]
>;

export const { PartitionedFileInstance } = buildNamedConstructorFunction({
  constructorName: 'PartitionedFileInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'id',
    'partitionFact',
    'file',
    'nodePath',
  ],
} as const)
  .withTypes<PartitionedFileConstructorInput, PartitionedFile>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { partitionFact, file } = input;

      const id = new PartitionedFileId({
        partitionFact: partitionFact.id,
        file: file.id,
      });

      return {
        id,
        partitionFact,
        file,
        nodePath: file.nodePath,
      };
    },
  })
  .assemble();

export const PARTITIONED_FILE_COLLECTION_ID = 'partitioned-file';

type PartitionedFileCollectionId = typeof PARTITIONED_FILE_COLLECTION_ID;

export type PartitionedFileStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    PartitionedFileCollectionId,
    PartitionedFile
  >;
