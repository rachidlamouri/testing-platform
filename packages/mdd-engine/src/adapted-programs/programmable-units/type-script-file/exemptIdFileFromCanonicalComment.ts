import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { LintAssertionId } from '../linting/lintAssertion';
import {
  LINT_ASSERTION_OMISSION_COLLECTION_ID,
  LintAssertionOmissionInstance,
  LintAssertionOmissionStreamMetatype,
} from '../linting/lintAssertionOmission';
import { FileSourceInstance } from '../linting/source/fileSource';
import { typeScriptFileHasCanonicalCommentRule } from './assertTypeScriptFileHasCanonicalComment';
import {
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  FileCommentedProgramBodyDeclarationGroupStreamMetatype,
} from './fileCommentedProgramBodyDeclarationGroup';

/**
 * Canonical names that end in Id are self explanatary since they are all
 * ComplexIds, and the part before "Id" explains what it is identifying.
 */
export const exemptIdFileFromCanonicalComment = buildProgrammedTransform({
  name: 'exemptIdFileFromCanonicalComment',
})
  .fromItem2<FileCommentedProgramBodyDeclarationGroupStreamMetatype>({
    collectionId: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  })
  .toItemTuple2<LintAssertionOmissionStreamMetatype>({
    collectionId: LINT_ASSERTION_OMISSION_COLLECTION_ID,
  })
  .onTransform((declarationGroup) => {
    const { canonicalDeclaration } = declarationGroup;

    if (canonicalDeclaration === null) {
      return [];
    }

    const endsInId =
      canonicalDeclaration.identifiableNode.id.name.endsWith('Id');

    if (!endsInId) {
      return [];
    }

    return [
      new LintAssertionOmissionInstance({
        omitterSource: new FileSourceInstance({
          absoluteFilePath: __filename,
        }),
        omittedAssertionId: new LintAssertionId({
          rule: typeScriptFileHasCanonicalCommentRule,
          lintSource: new FileSourceInstance({
            filePath: declarationGroup.filePathObject.serialized,
          }),
        }),
      }),
    ];
  })
  .assemble();
