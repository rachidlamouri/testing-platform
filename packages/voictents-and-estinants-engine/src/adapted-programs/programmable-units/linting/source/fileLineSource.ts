import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../package-agnostic-utilities/datastructure/zorn';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { SourceTypeName } from './sourceTypeName';

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
  lineNumber: number | string;
};

/**
 * The information needed to locate a particular line in a file
 */
export type FileLineSource = SimplifyN<
  [
    {
      typeName: SourceTypeName.FileLineSource;
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
    'typeName',
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
        typeName: SourceTypeName.FileLineSource,
        zorn,
        filePath,
        lineNumber,
        serialized: `${filePath}:${lineNumber}`,
      } satisfies FileLineSource;
    },
  })
  .assemble();
