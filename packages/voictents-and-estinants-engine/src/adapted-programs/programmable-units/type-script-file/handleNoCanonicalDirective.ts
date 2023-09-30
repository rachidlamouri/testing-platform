import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import { LintAssertionZorn } from '../linting/lintAssertion';
import {
  LINT_ASSERTION_OMISSION_GEPP,
  LintAssertionOmissionInstance,
  LintAssertionOmissionVoque,
} from '../linting/lintAssertionOmission';
import { EstinantSourceInstance } from '../linting/source/estinantSource';
import { FileSourceInstance } from '../linting/source/fileSource';
import { typeScriptFileHasCanonicalDeclarationRule } from './canonical-declaration/assertTypeScriptFileHasCanonicalDeclaration';
import { CommentTagId } from './comment/commentTagId';
import {
  FILE_PARSED_COMMENT_GROUP_GEPP,
  FileParsedCommentGroupVoque,
} from './fileParsedCommentGroup';

const ESTINANT_NAME = 'handleNoCanonicalDirective' as const;

const omitterSource = new EstinantSourceInstance({
  filePath: __filename,
  estinantName: ESTINANT_NAME,
});

/**
 * Creates an assertion omission for files with a specific tag in their file
 * comment
 */
export const handleNoCanonicalDirective = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<FileParsedCommentGroupVoque>({
    gepp: FILE_PARSED_COMMENT_GROUP_GEPP,
  })
  .toHubblepupTuple2<LintAssertionOmissionVoque>({
    gepp: LINT_ASSERTION_OMISSION_GEPP,
  })
  .onPinbe((commentGroup) => {
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
