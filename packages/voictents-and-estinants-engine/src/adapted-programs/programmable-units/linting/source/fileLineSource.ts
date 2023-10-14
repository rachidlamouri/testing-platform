import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { SourceTypeName } from './sourceTypeName';

const FILE_LINE_SOURCE_ZORN_TEMPLATE = [
  'filePath',
  'lineNumber',
] as const satisfies GenericComplexIdTemplate;
type FileLineSourceZornTemplate = typeof FILE_LINE_SOURCE_ZORN_TEMPLATE;
class FileLineSourceZorn extends ComplexId<FileLineSourceZornTemplate> {
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
      id: FileLineSourceZorn;
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
    'id',
    'filePath',
    'lineNumber',
    'serialized',
  ] as const satisfies readonly (keyof FileLineSource)[],
})
  .withTypes<FileLineSourceConstructorInput, FileLineSource>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { filePath, lineNumber } = input;

      const id = new FileLineSourceZorn({
        filePath,
        lineNumber: `${lineNumber}`,
      });

      return {
        typeName: SourceTypeName.FileLineSource,
        id,
        filePath,
        lineNumber,
        serialized: `${filePath}:${lineNumber}`,
      } satisfies FileLineSource;
    },
  })
  .assemble();
