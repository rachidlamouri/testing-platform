import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexzornTemplate,
  Complexzorn,
} from '../../../../package-agnostic-utilities/datastructure/zorn';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { SourceTypeName } from './sourceTypeName';

const IMPORTED_IDENTIFIER_SOURCE_ZORN_TEMPLATE = [
  'importingFilePath',
  'importedIdentifierName',
] as const satisfies GenericComplexzornTemplate;
type ImportedIdentifierSourceZornTemplate =
  typeof IMPORTED_IDENTIFIER_SOURCE_ZORN_TEMPLATE;
class ImportedIdentifierSourceZorn extends Complexzorn<ImportedIdentifierSourceZornTemplate> {
  get rawTemplate(): ImportedIdentifierSourceZornTemplate {
    return IMPORTED_IDENTIFIER_SOURCE_ZORN_TEMPLATE;
  }
}

type ImportedIdentifierSourceConstructorInput = {
  importingFilePath: string;
  importedIdentifierName: string;
};

/**
 * The information needed to find an import declaration with an identifiable
 * specifier
 *
 *  @todo replace this with an AST node source or something, especially if by
 *  the time you read this its still only used in one place
 */
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
