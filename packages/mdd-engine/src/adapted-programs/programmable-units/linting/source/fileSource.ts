import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { SourceTypeName } from './sourceTypeName';

const FILE_SOURCE_ID_TEMPLATE = [
  'filePath',
] as const satisfies GenericComplexIdTemplate;
type FileSourceIdTemplate = typeof FILE_SOURCE_ID_TEMPLATE;
class FileSourceId extends ComplexId<FileSourceIdTemplate> {
  get rawTemplate(): FileSourceIdTemplate {
    return FILE_SOURCE_ID_TEMPLATE;
  }
}

type FileSourceConstructorInput = {
  filePath: string;
};

/**
 * The information needed to find a file (which is just a filepath)
 */
export type FileSource = SimplifyN<
  [
    {
      typeName: SourceTypeName.FileSource;
      id: FileSourceId;
    },
    FileSourceConstructorInput,
  ]
>;

export const { FileSourceInstance } = buildNamedConstructorFunction({
  constructorName: 'FileSourceInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'typeName',
    'id',
    'filePath',
  ] as const satisfies readonly (keyof FileSource)[],
})
  .withTypes<FileSourceConstructorInput, FileSource>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { filePath } = input;

      const id = new FileSourceId({
        filePath,
      });

      return {
        typeName: SourceTypeName.FileSource,
        id,
        ...input,
      } satisfies FileSource;
    },
  })
  .assemble();