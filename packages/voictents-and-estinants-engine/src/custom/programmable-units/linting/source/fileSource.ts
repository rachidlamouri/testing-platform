import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../utilities/simplify';

const FILE_SOURCE_ZORN_TEMPLATE = [
  'filePath',
] as const satisfies GenericZorn2Template;
type FileSourceZornTemplate = typeof FILE_SOURCE_ZORN_TEMPLATE;
class FileSourceZorn extends Zorn2<FileSourceZornTemplate> {
  get rawTemplate(): FileSourceZornTemplate {
    return FILE_SOURCE_ZORN_TEMPLATE;
  }
}

type FileSourceConstructorInput = {
  filePath: string;
};

export type FileSource = SimplifyN<
  [
    {
      zorn: FileSourceZorn;
    },
    FileSourceConstructorInput,
  ]
>;

export const { FileSourceInstance } = buildNamedConstructorFunction({
  constructorName: 'FileSourceInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
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
        zorn,
        ...input,
      } satisfies FileSource;
    },
  })
  .assemble();
