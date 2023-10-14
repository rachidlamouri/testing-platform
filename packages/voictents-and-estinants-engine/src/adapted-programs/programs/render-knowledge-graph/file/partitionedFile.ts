import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { FilePath } from '../../../programmable-units/file/filePath';
import { FileSystemNodeZorn } from '../../../programmable-units/file/fileSystemNode';
import {
  PartitionFact,
  PartitionFactId,
} from '../partition-fact/partitionFact';
import { BoundedFile } from './boundedFile';

const PARTITIONED_FILE_ZORN_TEMPLATE = [
  ['partitionFact', PartitionFactId],
  ['file', FileSystemNodeZorn],
] as const satisfies GenericComplexIdTemplate;
type PartitionedFileZornTemplate = typeof PARTITIONED_FILE_ZORN_TEMPLATE;
class PartitionedFileZorn extends ComplexId<PartitionedFileZornTemplate> {
  get rawTemplate(): PartitionedFileZornTemplate {
    return PARTITIONED_FILE_ZORN_TEMPLATE;
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
      id: PartitionedFileZorn;
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

      const id = new PartitionedFileZorn({
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

export const PARTITIONED_FILE_GEPP = 'partitioned-file';

type PartitionedFileGepp = typeof PARTITIONED_FILE_GEPP;

export type PartitionedFileVoque = InMemoryIdentifiableItem3StreamMetatype<
  PartitionedFileGepp,
  PartitionedFile
>;
