import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
import { LintAssertionZorn } from '../linting/lintAssertion';
import {
  LINT_ASSERTION_OMISSION_GEPP,
  LintAssertionOmissionInstance,
  LintAssertionOmissionVoque,
} from '../linting/lintAssertionOmission';
import { ProgrammedTransformSourceInstance } from '../linting/source/estinantSource';
import { FileSourceInstance } from '../linting/source/fileSource';
import { typeScriptFileHasCanonicalDeclarationRule } from './canonical-declaration/assertTypeScriptFileHasCanonicalDeclaration';
import { CommentTagId } from './comment/commentTagId';
import {
  FILE_PARSED_COMMENT_GROUP_GEPP,
  FileParsedCommentGroupVoque,
} from './fileParsedCommentGroup';

const ESTINANT_NAME = 'handleNoCanonicalDirective' as const;

const omitterSource = new ProgrammedTransformSourceInstance({
  filePath: __filename,
  programmedTransformName: ESTINANT_NAME,
});

/**
 * Creates an assertion omission for files with a specific tag in their file
 * comment
 */
export const handleNoCanonicalDirective = buildProgrammedTransform({
  name: ESTINANT_NAME,
})
  .fromItem2<FileParsedCommentGroupVoque>({
    collectionId: FILE_PARSED_COMMENT_GROUP_GEPP,
  })
  .toItemTuple2<LintAssertionOmissionVoque>({
    collectionId: LINT_ASSERTION_OMISSION_GEPP,
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
          omittedAssertionZorn: new LintAssertionZorn({
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
