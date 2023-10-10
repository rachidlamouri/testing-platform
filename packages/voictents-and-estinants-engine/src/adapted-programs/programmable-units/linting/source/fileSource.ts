import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexzornTemplate,
  Complexzorn,
} from '../../../../package-agnostic-utilities/data-structure/zorn';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { SourceTypeName } from './sourceTypeName';

const FILE_SOURCE_ZORN_TEMPLATE = [
  'filePath',
] as const satisfies GenericComplexzornTemplate;
type FileSourceZornTemplate = typeof FILE_SOURCE_ZORN_TEMPLATE;
class FileSourceZorn extends Complexzorn<FileSourceZornTemplate> {
  get rawTemplate(): FileSourceZornTemplate {
    return FILE_SOURCE_ZORN_TEMPLATE;
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
      zorn: FileSourceZorn;
    },
    FileSourceConstructorInput,
  ]
>;

export const { FileSourceInstance } = buildNamedConstructorFunction({
  constructorName: 'FileSourceInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'typeName',
    'zorn',
    'filePath',
  ] as const satisfies readonly (keyof FileSource)[],
})
  .withTypes<FileSourceConstructorInput, FileSource>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { filePath } = input;

      const zorn = new FileSourceZorn({
        filePath,
      });

      return {
        typeName: SourceTypeName.FileSource,
        zorn,
        ...input,
      } satisfies FileSource;
    },
  })
  .assemble();
