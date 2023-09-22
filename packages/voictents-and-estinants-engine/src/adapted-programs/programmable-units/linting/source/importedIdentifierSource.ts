import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../utilities/simplify';
import { SourceTypeName } from './sourceTypeName';

const IMPORTED_IDENTIFIER_SOURCE_ZORN_TEMPLATE = [
  'importingFilePath',
  'importedIdentifierName',
] as const satisfies GenericZorn2Template;
type ImportedIdentifierSourceZornTemplate =
  typeof IMPORTED_IDENTIFIER_SOURCE_ZORN_TEMPLATE;
class ImportedIdentifierSourceZorn extends Zorn2<ImportedIdentifierSourceZornTemplate> {
  get rawTemplate(): ImportedIdentifierSourceZornTemplate {
    return IMPORTED_IDENTIFIER_SOURCE_ZORN_TEMPLATE;
  }
}

type ImportedIdentifierSourceConstructorInput = {
  importingFilePath: string;
  importedIdentifierName: string;
};

// TODO: replace this with an AST node source or something, especially if by the time you read this its still only used in one place
export type ImportedIdentifierSource = SimplifyN<
  [
    {
      typeName: SourceTypeName.ImportedIdentifierSource;
      zorn: ImportedIdentifierSourceZorn;
    },
    ImportedIdentifierSourceConstructorInput,
  ]
>;

export const { ImportedIdentifierSourceInstance } =
  buildNamedConstructorFunction({
    constructorName: 'ImportedIdentifierSourceInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'typeName',
      'zorn',
      'importingFilePath',
      'importedIdentifierName',
    ] as const satisfies readonly (keyof ImportedIdentifierSource)[],
  })
    .withTypes<
      ImportedIdentifierSourceConstructorInput,
      ImportedIdentifierSource
    >({
      typeCheckErrorMesssages: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { importingFilePath, importedIdentifierName } = input;

        const zorn = new ImportedIdentifierSourceZorn({
          importingFilePath,
          importedIdentifierName,
        });

        return {
          typeName: SourceTypeName.ImportedIdentifierSource,
          zorn,
          ...input,
        } satisfies ImportedIdentifierSource;
      },
    })
    .assemble();
