import { posix } from 'path';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { assertNotNull } from '../../../package-agnostic-utilities/nil/assertNotNull';
import {
  LINT_ASSERTION_COLLECTION_ID,
  LintAssertion,
  LintAssertionStreamMetatype,
} from '../linting/lintAssertion';
import { TypedRule } from '../linting/rule';
import { ProgrammedTransformSourceInstance } from '../linting/source/programmedTransformSource';
import {
  CanonicalCommentLintMetadata,
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  FileCommentedProgramBodyDeclarationGroupStreamMetatype,
} from './fileCommentedProgramBodyDeclarationGroup';
import { FileSourceInstance } from '../linting/source/fileSource';
import {
  PARSED_TYPE_SCRIPT_FILE_COLLECTION_ID,
  ParsedTypeScriptFileStreamMetatype,
} from './parsedTypeScriptFile';

const PROGRAMMED_TRANSFORM_NAME =
  'assertTypeScriptFileHasCanonicalComment' as const;

type MessageContext = {
  trimmedCanonicalCommentText: string | null;
  canonicalCommentLintMetadata: CanonicalCommentLintMetadata;
};

// TODO: add exemption for files that export ComplexId subclasses
export const typeScriptFileHasCanonicalCommentRule =
  new TypedRule<MessageContext>({
    name: 'typescript-file-has-canonical-comment',
    source: new ProgrammedTransformSourceInstance({
      filePath: posix.relative('', __filename),
      programmedTransformName: PROGRAMMED_TRANSFORM_NAME,
    }),
    description:
      'All TypeScript files must have a canonical comment with a description.',
    getErrorMessage: ({
      trimmedCanonicalCommentText,
      canonicalCommentLintMetadata,
    }): string => {
      let reason: string;
      let remediationList: string[];

      if (trimmedCanonicalCommentText === '') {
        reason = 'Comment cannot be empty.';
        remediationList = ['Fill out the canonical comment'];
      } else {
        assertNotNull(canonicalCommentLintMetadata.badStateReason);
        assertNotNull(canonicalCommentLintMetadata.remediationList);
        reason = canonicalCommentLintMetadata.badStateReason;
        remediationList = canonicalCommentLintMetadata.remediationList;
      }

      // TODO: formatting should go elsewhere. This should probably return an object.
      return [
        `File has an invalid canonical comment. ${reason}`,
        '  Remediation Options:',
        ...remediationList.map((option) => {
          return `    - ${option}`;
        }),
      ].join('\n');
    },
  });

/**
 * Verifies that a TypeScript file has non-empty comment either on the canonical
 * declaration or in the file comment in the case that the canonical declaration
 * does not exist.
 */
export const assertTypeScriptFileHasCanonicalComment = buildProgrammedTransform(
  {
    name: PROGRAMMED_TRANSFORM_NAME,
  },
)
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
  .onTransform((parsedFile, [declarationGroup]) => {
    const { filePath } = declarationGroup;
    const trimmedCanonicalCommentText =
      declarationGroup.canonicalComment?.description?.trim() ?? null;
    const errorMessageContext: MessageContext = {
      trimmedCanonicalCommentText,
      canonicalCommentLintMetadata:
        declarationGroup.canonicalCommentLintMetadata,
    };

    return new LintAssertion({
      rule: typeScriptFileHasCanonicalCommentRule,
      lintSource: new FileSourceInstance({
        filePath: declarationGroup.filePath,
      }),
      isValid:
        !parsedFile.hasCode ||
        (trimmedCanonicalCommentText !== null &&
          trimmedCanonicalCommentText !== ''),
      errorMessageContext,
      context: {
        filePath,
        errorMessageContext,
      },
    });
  })
  .assemble();
