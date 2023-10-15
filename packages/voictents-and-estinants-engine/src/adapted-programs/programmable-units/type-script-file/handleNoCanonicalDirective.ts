import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { LintAssertionId } from '../linting/lintAssertion';
import {
  LINT_ASSERTION_OMISSION_COLLECTION_ID,
  LintAssertionOmissionInstance,
  LintAssertionOmissionStreamMetatype,
} from '../linting/lintAssertionOmission';
import { ProgrammedTransformSourceInstance } from '../linting/source/estinantSource';
import { FileSourceInstance } from '../linting/source/fileSource';
import { typeScriptFileHasCanonicalDeclarationRule } from './canonical-declaration/assertTypeScriptFileHasCanonicalDeclaration';
import { CommentTagId } from './comment/commentTagId';
import {
  FILE_PARSED_COMMENT_GROUP_COLLECTION_ID,
  FileParsedCommentGroupStreamMetatype,
} from './fileParsedCommentGroup';

const PROGRAMMED_TRANSFORM_NAME = 'handleNoCanonicalDirective' as const;

const omitterSource = new ProgrammedTransformSourceInstance({
  filePath: __filename,
  programmedTransformName: PROGRAMMED_TRANSFORM_NAME,
});

/**
 * Creates an assertion omission for files with a specific tag in their file
 * comment
 */
export const handleNoCanonicalDirective = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromItem2<FileParsedCommentGroupStreamMetatype>({
    collectionId: FILE_PARSED_COMMENT_GROUP_COLLECTION_ID,
  })
  .toItemTuple2<LintAssertionOmissionStreamMetatype>({
    collectionId: LINT_ASSERTION_OMISSION_COLLECTION_ID,
  })
  .onTransform((commentGroup) => {
    if (
      commentGroup.fileComment !== null &&
      commentGroup.fileComment.tagIdSet.has(
        CommentTagId.CanonicalDeclarationExemption,
      )
    ) {
      return [
        new LintAssertionOmissionInstance({
          omittedAssertionId: new LintAssertionId({
            rule: typeScriptFileHasCanonicalDeclarationRule,
            lintSource: new FileSourceInstance({
              filePath: commentGroup.filePath,
            }),
          }),
          omitterSource,
        }),
      ];
    }

    return [];
  })
  .assemble();
