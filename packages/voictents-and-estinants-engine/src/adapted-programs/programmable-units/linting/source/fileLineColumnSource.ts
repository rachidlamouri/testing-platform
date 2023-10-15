import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { SourceTypeName } from './sourceTypeName';

const FILE_LINE_COLUMN_SOURCE_ID_TEMPLATE = [
  'filePath',
  'lineNumber',
  'columnNumber',
] as const satisfies GenericComplexIdTemplate;
type FileLineColumnSourceIdTemplate =
  typeof FILE_LINE_COLUMN_SOURCE_ID_TEMPLATE;
class FileLineColumnSourceId extends ComplexId<FileLineColumnSourceIdTemplate> {
  get rawTemplate(): FileLineColumnSourceIdTemplate {
    return FILE_LINE_COLUMN_SOURCE_ID_TEMPLATE;
  }
}

type FileLineColumnSourceConstructorInput = {
  filePath: string;
  lineNumber: number | string;
  columnNumber: number | string;
};

/**
 * The information needed to locate a particular line and column in a file
 */
export type FileLineColumnSource = SimplifyN<
  [
    {
      typeName: SourceTypeName.FileLineColumnSource;
      id: FileLineColumnSourceId;
    },
    FileLineColumnSourceConstructorInput,
  ]
>;

export const { FileLineColumnSourceInstance } = buildNamedConstructorFunction({
  constructorName: 'FileLineColumnSourceInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'typeName',
    'id',
    'filePath',
    'lineNumber',
    'columnNumber',
  ] as const satisfies readonly (keyof FileLineColumnSource)[],
})
  .withTypes<FileLineColumnSourceConstructorInput, FileLineColumnSource>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { filePath, lineNumber, columnNumber } = input;

      const id = new FileLineColumnSourceId({
        filePath,
        lineNumber: `${lineNumber}`,
        columnNumber: `${columnNumber}`,
      });

      return {
        typeName: SourceTypeName.FileLineColumnSource,
        id,
        ...input,
      } satisfies FileLineColumnSource;
    },
  })
  .assemble();
