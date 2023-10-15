import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { SourceTypeName } from './sourceTypeName';

const IMPORTED_IDENTIFIER_SOURCE_ID_TEMPLATE = [
  'importingFilePath',
  'importedIdentifierName',
] as const satisfies GenericComplexIdTemplate;
type ImportedIdentifierSourceIdTemplate =
  typeof IMPORTED_IDENTIFIER_SOURCE_ID_TEMPLATE;
class ImportedIdentifierSourceId extends ComplexId<ImportedIdentifierSourceIdTemplate> {
  get rawTemplate(): ImportedIdentifierSourceIdTemplate {
    return IMPORTED_IDENTIFIER_SOURCE_ID_TEMPLATE;
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
      id: ImportedIdentifierSourceId;
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
      'id',
      'importingFilePath',
      'importedIdentifierName',
    ] as const satisfies readonly (keyof ImportedIdentifierSource)[],
  })
    .withTypes<
      ImportedIdentifierSourceConstructorInput,
      ImportedIdentifierSource
    >({
      typeCheckErrorMessage: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { importingFilePath, importedIdentifierName } = input;

        const id = new ImportedIdentifierSourceId({
          importingFilePath,
          importedIdentifierName,
        });

        return {
          typeName: SourceTypeName.ImportedIdentifierSource,
          id,
          ...input,
        } satisfies ImportedIdentifierSource;
      },
    })
    .assemble();
