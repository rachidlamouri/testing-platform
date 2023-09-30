import { posix } from 'path';
import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import { assertNotNull } from '../../../package-agnostic-utilities/nil/assertNotNull';
import {
  LINT_ASSERTION_GEPP,
  LintAssertion,
  LintAssertionVoque,
} from '../linting/lintAssertion';
import { TypedRule } from '../linting/rule';
import { EstinantSourceInstance } from '../linting/source/estinantSource';
import {
  CanonicalCommentLintMetadata,
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
  FileCommentedProgramBodyDeclarationGroupVoque,
} from './fileCommentedProgramBodyDeclarationGroup';
import { FileSourceInstance } from '../linting/source/fileSource';

const ESTINANT_NAME = 'assertTypeScriptFileHasCanonicalDeclaration' as const;

type MessageContext = {
  filePath: string;
  trimmedCanonicalCommentText: string | null;
  canonicalCommentLintMetadata: CanonicalCommentLintMetadata;
};

const typeScriptFileHasCanonicalCommentRule = new TypedRule<MessageContext>({
  name: 'typescript-file-has-canonical-comment',
  source: new EstinantSourceInstance({
    filePath: posix.relative('', __filename),
    estinantName: ESTINANT_NAME,
  }),
  description:
    'All TypeScript files must have a canonical comment with a description.',
  getErrorMessage: ({
    filePath,
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
      `File ${filePath} has an invalid canonical comment. ${reason}`,
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
export const assertTypeScriptFileHasCanonialComment = buildEstinant({
  name: 'assertTypeScriptFileHasCanonialComment',
})
  .fromHubblepup2<FileCommentedProgramBodyDeclarationGroupVoque>({
    gepp: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
  })
  .toHubblepup2<LintAssertionVoque>({
    gepp: LINT_ASSERTION_GEPP,
  })
  .onPinbe((declarationGroup) => {
    const { filePath } = declarationGroup;
    const trimmedCanonicalCommentText =
      declarationGroup.canonicalComment?.description?.trim() ?? null;
    const errorMessageContext: MessageContext = {
      filePath,
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
        trimmedCanonicalCommentText !== null &&
        trimmedCanonicalCommentText !== '',
      errorMessageContext,
      context: errorMessageContext,
    });
  })
  .assemble();
