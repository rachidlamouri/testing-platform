import { posix } from 'path';
import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  LINT_ASSERTION_COLLECTION_ID,
  LintAssertion,
  LintAssertionStreamMetatype,
} from '../../linting/lintAssertion';
import { TypedRule } from '../../linting/rule';
import { ProgrammedTransformSourceInstance } from '../../linting/source/programmedTransformSource';
import { FileSourceInstance } from '../../linting/source/fileSource';
import {
  CanonicalDeclarationLintMetadata,
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  FileCommentedProgramBodyDeclarationGroupStreamMetatype,
} from '../fileCommentedProgramBodyDeclarationGroup';
import { isNotNull } from '../../../../package-agnostic-utilities/nil/isNotNull';
import { shishKebab } from '../../../../package-agnostic-utilities/case/shishKebab';
import { assertNotNull } from '../../../../package-agnostic-utilities/nil/assertNotNull';
import {
  PARSED_TYPE_SCRIPT_FILE_COLLECTION_ID,
  ParsedTypeScriptFileStreamMetatype,
} from '../parsedTypeScriptFile';

const PROGRAMMED_TRANSFORM_NAME =
  'assertTypeScriptFileHasCanonicalDeclaration' as const;

type TypeScriptFileHasCanonicalDeclarationMessageContext = {
  filePath: string;
  canonicalDeclarationLintMetadata: CanonicalDeclarationLintMetadata;
};
export const typeScriptFileHasCanonicalDeclarationRule =
  new TypedRule<TypeScriptFileHasCanonicalDeclarationMessageContext>({
    name: 'typescript-file-has-canonical-declaration',
    source: new ProgrammedTransformSourceInstance({
      filePath: posix.relative('', __filename),
      programmedTransformName: PROGRAMMED_TRANSFORM_NAME,
    }),
    description:
      'All TypeScript files must have at least one top level declaration whose name matches the file name regardless of casing',
    getErrorMessage: ({
      filePath,
      canonicalDeclarationLintMetadata,
    }): string => {
      const { badStateReason, remediationOptionList } =
        canonicalDeclarationLintMetadata;

      assertNotNull(badStateReason);
      assertNotNull(remediationOptionList);

      return [
        `File ${filePath} does not have exactly one canonical declaration. ${badStateReason}`,
        '  Remediation Options:',
        ...remediationOptionList.map((option) => {
          return `    - ${option}`;
        }),
      ].join('\n');
    },
  });

/**
 * Asserts that a TypeScript file has a top level declaration whose identifier
 * name matches the file name regardless of casing
 */
export const assertTypeScriptFileHasCanonicalDeclaration =
  buildProgrammedTransform({
    name: PROGRAMMED_TRANSFORM_NAME,
  })
    .fromItem2<ParsedTypeScriptFileStreamMetatype>({
      collectionId: PARSED_TYPE_SCRIPT_FILE_COLLECTION_ID,
    })
    .andFromItemTuple2<
      FileCommentedProgramBodyDeclarationGroupStreamMetatype,
      [string]
    >({
      collectionId: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
      getRightKeyTuple: (file) => {
        return [file.item.filePathObject.serialized];
      },
      getRightKey: (file) => {
        return file.item.filePathObject.serialized;
      },
    })
    .toItem2<LintAssertionStreamMetatype>({
      collectionId: LINT_ASSERTION_COLLECTION_ID,
    })
    .onTransform((parsedFile, [group]) => {
      return new LintAssertion({
        rule: typeScriptFileHasCanonicalDeclarationRule,
        lintSource: new FileSourceInstance({
          filePath: group.filePath,
        }),
        isValid: !parsedFile.hasCode || group.canonicalDeclaration !== null,
        errorMessageContext: {
          filePath: group.filePath,
          canonicalDeclarationLintMetadata:
            group.canonicalDeclarationLintMetadata,
        },
        context: {
          group,
          // TODO: sync this normalization pattern with the one in getCommentedProgramBodyDeclarationList
          normalizedIdentifierList: group.list
            .map((declaration) => declaration.identifiableNode)
            .filter(isNotNull)
            .map((identifiableNode) => {
              return shishKebab(identifiableNode.id.name);
            }),
        },
      });
    })
    .assemble();
