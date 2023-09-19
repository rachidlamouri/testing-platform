import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../utilities/simplify';

const FILE_LINE_SOURCE_ZORN_TEMPLATE = [
  'filePath',
  'lineNumber',
] as const satisfies GenericZorn2Template;
type FileLineSourceZornTemplate = typeof FILE_LINE_SOURCE_ZORN_TEMPLATE;
class FileLineSourceZorn extends Zorn2<FileLineSourceZornTemplate> {
  get rawTemplate(): FileLineSourceZornTemplate {
    return FILE_LINE_SOURCE_ZORN_TEMPLATE;
  }
}

type FileLineSourceConstructorInput = {
  filePath: string;
  lineNumber: number;
};

export type FileLineSource = SimplifyN<
  [
    {
      zorn: FileLineSourceZorn;
    },
    FileLineSourceConstructorInput,
    {
      serialized: string;
    },
  ]
>;

export const { FileLineSourceInstance } = buildNamedConstructorFunction({
  constructorName: 'FileLineSourceInstance' as const,
  instancePropertyNameTuple: [
    // multiline-keep
    'zorn',
    'filePath',
    'lineNumber',
    'serialized',
  ] as const satisfies readonly (keyof FileLineSource)[],
})
  .withTypes<FileLineSourceConstructorInput, FileLineSource>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { filePath, lineNumber } = input;

      const zorn = new FileLineSourceZorn({
        filePath,
        lineNumber: `${lineNumber}`,
      });

      return {
        zorn,
        filePath,
        lineNumber,
        serialized: `${filePath}:${lineNumber}`,
      } satisfies FileLineSource;
    },
  })
  .assemble();

export const FILE_LINE_SOURCE_GEPP = 'file-line-source';

type FileLineSourceGepp = typeof FILE_LINE_SOURCE_GEPP;

export type FileLineSourceVoque = InMemoryOdeshin2ListVoque<
  FileLineSourceGepp,
  FileLineSource
>;
