import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { LintAssertionId } from '../linting/lintAssertion';
import {
  LINT_ASSERTION_OMISSION_COLLECTION_ID,
  LintAssertionOmissionInstance,
  LintAssertionOmissionStreamMetatype,
} from '../linting/lintAssertionOmission';
import { ProgrammedTransformSourceInstance } from '../linting/source/programmedTransformSource';
import { FileSourceInstance } from '../linting/source/fileSource';
import {
  ENGINE_PROGRAM_FILE_COLLECTION_ID,
  EngineProgramFileStreamMetatype,
} from '../type-script-file-relationships/engineProgramFile';
import { typeScriptFileHasCanonicalDeclarationRule } from './canonical-declaration/assertTypeScriptFileHasCanonicalDeclaration';

const PROGRAMMED_TRANSFORM_NAME =
  'omitProgramCanonicalExportRequirement' as const;

const omitterSource = new ProgrammedTransformSourceInstance({
  filePath: __filename,
  programmedTransformName: PROGRAMMED_TRANSFORM_NAME,
});

/**
 * Creates an assertion omission for program files
 */
export const omitProgramCanonicalExportRequirement = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromItem2<EngineProgramFileStreamMetatype>({
    collectionId: ENGINE_PROGRAM_FILE_COLLECTION_ID,
  })
  .toItem2<LintAssertionOmissionStreamMetatype>({
    collectionId: LINT_ASSERTION_OMISSION_COLLECTION_ID,
  })
  .onTransform((engineFile) => {
    return new LintAssertionOmissionInstance({
      omitterSource,
      omittedAssertionId: new LintAssertionId({
        rule: typeScriptFileHasCanonicalDeclarationRule,
        lintSource: new FileSourceInstance({
          filePath: engineFile.file.filePath.serialized,
        }),
      }),
    });
  })
  .assemble();
