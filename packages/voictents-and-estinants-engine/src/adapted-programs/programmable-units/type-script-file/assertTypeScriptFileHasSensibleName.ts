import chalk from 'chalk';
import { posix } from 'path';
import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import {
  LINT_ASSERTION_GEPP,
  LintAssertion,
  LintAssertionVoque,
} from '../linting/lintAssertion';
import { EmptyMessageContext, TypedRule } from '../linting/rule';
import { EstinantSourceInstance } from '../linting/source/estinantSource';
import { CommentTagId } from './comment/commentTagId';
import {
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
  FileCommentedProgramBodyDeclarationGroupVoque,
} from './fileCommentedProgramBodyDeclarationGroup';
import { FileSourceInstance } from '../linting/source/fileSource';

const ESTINANT_NAME = 'assertTypeScriptFileHasSensibleName' as const;

export const typeScriptFileHasSensibleNameRule =
  new TypedRule<EmptyMessageContext>({
    name: 'type-script-file-has-sensible-name',
    description: `TypeScript files must have a name without nonsense words, or a @${CommentTagId.ReadableName} annotation in their canonical comment with a readable name.`,
    source: new EstinantSourceInstance({
      filePath: posix.relative('', __filename),
      estinantName: ESTINANT_NAME,
    }),
    getErrorMessage: (): string => {
      const emphasizedTag = chalk.cyan(`@${CommentTagId.ReadableName}`);

      return `File has nonsensical name. Update the ${emphasizedTag} to be composed of sensible words.`;
    },
  });

/**
 * Produces an assertion based on whether or not a TypeScript file has a
 * sensible name or a sensible name annotation
 */
export const assertTypeScriptFileHasSensibleName = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<FileCommentedProgramBodyDeclarationGroupVoque>({
    gepp: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
  })
  .toHubblepup2<LintAssertionVoque>({
    gepp: LINT_ASSERTION_GEPP,
  })
  .onPinbe((commentGroup) => {
    return new LintAssertion({
      rule: typeScriptFileHasSensibleNameRule,
      lintSource: new FileSourceInstance({
        filePath: commentGroup.filePathObject.serialized,
      }),
      isValid: commentGroup.hasSensibleName,
      errorMessageContext: {},
      context: {
        commentGroup,
      },
    });
  })
  .assemble();
