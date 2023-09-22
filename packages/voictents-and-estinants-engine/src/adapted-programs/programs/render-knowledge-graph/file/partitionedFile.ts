import { InMemoryOdeshin3Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../utilities/simplify';
import { FilePath } from '../../../programmable-units/file/filePath';
import { FileSystemNodeZorn } from '../../../programmable-units/file/fileSystemNode';
import {
  PartitionFact,
  PartitionFactZorn,
} from '../partition-fact/partitionFact';
import { BoundedFile } from './boundedFile';

const PARTITIONED_FILE_ZORN_TEMPLATE = [
  ['partitionFact', PartitionFactZorn],
  ['file', FileSystemNodeZorn],
] as const satisfies GenericZorn2Template;
type PartitionedFileZornTemplate = typeof PARTITIONED_FILE_ZORN_TEMPLATE;
class PartitionedFileZorn extends Zorn2<PartitionedFileZornTemplate> {
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
      zorn: PartitionedFileZorn;
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
    'zorn',
    'partitionFact',
    'file',
    'nodePath',
  ],
} as const)
  .withTypes<PartitionedFileConstructorInput, PartitionedFile>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { partitionFact, file } = input;

      const zorn = new PartitionedFileZorn({
        partitionFact: partitionFact.zorn,
        file: file.zorn,
      });

      return {
        zorn,
        partitionFact,
        file,
        nodePath: file.nodePath,
      };
    },
  })
  .assemble();

export const PARTITIONED_FILE_GEPP = 'partitioned-file';

type PartitionedFileGepp = typeof PARTITIONED_FILE_GEPP;

export type PartitionedFileVoque = InMemoryOdeshin3Voque<
  PartitionedFileGepp,
  PartitionedFile
>;
