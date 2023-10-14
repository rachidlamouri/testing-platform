import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { LintAssertionZorn } from '../linting/lintAssertion';
import {
  LINT_ASSERTION_OMISSION_COLLECTION_ID,
  LintAssertionOmissionInstance,
  LintAssertionOmissionVoque,
} from '../linting/lintAssertionOmission';
import { ProgrammedTransformSourceInstance } from '../linting/source/estinantSource';
import { FileSourceInstance } from '../linting/source/fileSource';
import {
  ENGINE_PROGRAM_FILE_GEPP,
  EngineProgramFileVoque,
} from '../type-script-file-relationships/engineProgramFile';
import { typeScriptFileHasCanonicalDeclarationRule } from './canonical-declaration/assertTypeScriptFileHasCanonicalDeclaration';

const ESTINANT_NAME = 'omitProgramCanonicalExportRequirement' as const;

const omitterSource = new ProgrammedTransformSourceInstance({
  filePath: __filename,
  programmedTransformName: ESTINANT_NAME,
});

/**
 * Creates an assertion omission for program files
 */
export const omitProgramCanonicalExportRequirement = buildProgrammedTransform({
  name: ESTINANT_NAME,
})
  .fromItem2<EngineProgramFileVoque>({
    collectionId: ENGINE_PROGRAM_FILE_GEPP,
  })
  .toItem2<LintAssertionOmissionVoque>({
    collectionId: LINT_ASSERTION_OMISSION_COLLECTION_ID,
  })
  .onTransform((engineFile) => {
    return new LintAssertionOmissionInstance({
      omitterSource,
      omittedAssertionZorn: new LintAssertionZorn({
        rule: typeScriptFileHasCanonicalDeclarationRule,
        lintSource: new FileSourceInstance({
          filePath: engineFile.file.filePath.serialized,
        }),
      }),
    });
  })
  .assemble();
