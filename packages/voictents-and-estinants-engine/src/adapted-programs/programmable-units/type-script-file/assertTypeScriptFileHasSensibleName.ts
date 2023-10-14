import chalk from 'chalk';
import { posix } from 'path';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  LINT_ASSERTION_COLLECTION_ID,
  LintAssertion,
  LintAssertionStreamMetatype,
} from '../linting/lintAssertion';
import { EmptyMessageContext, TypedRule } from '../linting/rule';
import { ProgrammedTransformSourceInstance } from '../linting/source/estinantSource';
import { CommentTagId } from './comment/commentTagId';
import {
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  FileCommentedProgramBodyDeclarationGroupStreamMetatype,
} from './fileCommentedProgramBodyDeclarationGroup';
import { FileSourceInstance } from '../linting/source/fileSource';
import { getPhraseSensibilityState } from '../../../layer-agnostic-utilities/nonsense/isSensiblePhrase';

const ESTINANT_NAME = 'assertTypeScriptFileHasSensibleName' as const;

const typeScriptFileHasSensibleNameRule = new TypedRule<EmptyMessageContext>({
  name: 'type-script-file-has-sensible-name',
  description: `TypeScript files must have a name without nonsense words, or a @${CommentTagId.ReadableName} annotation in their canonical comment with a readable name.`,
  source: new ProgrammedTransformSourceInstance({
    filePath: posix.relative('', __filename),
    programmedTransformName: ESTINANT_NAME,
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
export const assertTypeScriptFileHasSensibleName = buildProgrammedTransform({
  name: ESTINANT_NAME,
})
  .fromItem2<FileCommentedProgramBodyDeclarationGroupStreamMetatype>({
    collectionId: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  })
  .toItem2<LintAssertionStreamMetatype>({
    collectionId: LINT_ASSERTION_COLLECTION_ID,
  })
  .onTransform((commentGroup) => {
    return new LintAssertion({
      rule: typeScriptFileHasSensibleNameRule,
      lintSource: new FileSourceInstance({
        filePath: commentGroup.filePathObject.serialized,
      }),
      isValid: commentGroup.hasSensibleName,
      errorMessageContext: {},
      context: {
        readableNameAnnotation: commentGroup.readableNameAnnotation,
        readableNameAnnotationSensibilityState:
          commentGroup.readableNameAnnotation !== null
            ? getPhraseSensibilityState(commentGroup.readableNameAnnotation)
            : null,
        canonicalName: commentGroup.canonicalName,
        canonicalNameSensibilityState: getPhraseSensibilityState(
          commentGroup.canonicalName,
        ),
        commentGroup,
      },
    });
  })
  .assemble();
