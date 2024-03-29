import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { SourceTypeName } from './sourceTypeName';

const EXPORTED_IDENTIFIER_SOURCE_ID_TEMPLATE = [
  'filePath',
  'exportedIdentifier',
] as const satisfies GenericComplexIdTemplate;
type ExportedIdentifierSourceIdTemplate =
  typeof EXPORTED_IDENTIFIER_SOURCE_ID_TEMPLATE;
class ExportedIdentifierSourceId extends ComplexId<ExportedIdentifierSourceIdTemplate> {
  get rawTemplate(): ExportedIdentifierSourceIdTemplate {
    return EXPORTED_IDENTIFIER_SOURCE_ID_TEMPLATE;
  }
}

type ExportedIdentifierSourceConstructorInput = {
  filePath: string;
  exportedIdentifier: string;
};

/**
 * The information needed to find an export declaration with an identifier
 *
 * @todo replace this with an AST node source or something, especially if by the
 * time you read this its still only used in one place
 */
export type ExportedIdentifierSource = SimplifyN<
  [
    {
      typeName: SourceTypeName.ExportedIdentifierSource;
      id: ExportedIdentifierSourceId;
    },
    ExportedIdentifierSourceConstructorInput,
  ]
>;

export const { ExportedIdentifierSourceInstance } =
  buildNamedConstructorFunction({
    constructorName: 'ExportedIdentifierSourceInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'typeName',
      'id',
      'filePath',
      'exportedIdentifier',
    ] as const satisfies readonly (keyof ExportedIdentifierSource)[],
  })
    .withTypes<
      ExportedIdentifierSourceConstructorInput,
      ExportedIdentifierSource
    >({
      typeCheckErrorMessage: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { filePath, exportedIdentifier } = input;

        const id = new ExportedIdentifierSourceId({
          filePath,
          exportedIdentifier,
        });

        return {
          typeName: SourceTypeName.ExportedIdentifierSource,
          id,
          ...input,
        } satisfies ExportedIdentifierSource;
      },
    })
    .assemble();
