import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexzornTemplate,
  Complexzorn,
} from '../../../../package-agnostic-utilities/data-structure/zorn';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { SourceTypeName } from './sourceTypeName';

const EXPORTED_IDENTIFIER_SOURCE_ZORN_TEMPLATE = [
  'filePath',
  'exportedIdentifier',
] as const satisfies GenericComplexzornTemplate;
type ExportedIdentifierSourceZornTemplate =
  typeof EXPORTED_IDENTIFIER_SOURCE_ZORN_TEMPLATE;
class ExportedIdentifierSourceZorn extends Complexzorn<ExportedIdentifierSourceZornTemplate> {
  get rawTemplate(): ExportedIdentifierSourceZornTemplate {
    return EXPORTED_IDENTIFIER_SOURCE_ZORN_TEMPLATE;
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
      zorn: ExportedIdentifierSourceZorn;
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
      'zorn',
      'filePath',
      'exportedIdentifier',
    ] as const satisfies readonly (keyof ExportedIdentifierSource)[],
  })
    .withTypes<
      ExportedIdentifierSourceConstructorInput,
      ExportedIdentifierSource
    >({
      typeCheckErrorMesssages: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { filePath, exportedIdentifier } = input;

        const zorn = new ExportedIdentifierSourceZorn({
          filePath,
          exportedIdentifier,
        });

        return {
          typeName: SourceTypeName.ExportedIdentifierSource,
          zorn,
          ...input,
        } satisfies ExportedIdentifierSource;
      },
    })
    .assemble();
