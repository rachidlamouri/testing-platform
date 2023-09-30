import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import { LintAssertionZorn } from '../linting/lintAssertion';
import {
  LINT_ASSERTION_OMISSION_GEPP,
  LintAssertionOmissionInstance,
  LintAssertionOmissionVoque,
} from '../linting/lintAssertionOmission';
import { EstinantSourceInstance } from '../linting/source/estinantSource';
import { FileSourceInstance } from '../linting/source/fileSource';
import {
  ENGINE_PROGRAM_FILE_GEPP,
  EngineProgramFileVoque,
} from '../type-script-file-relationships/engineProgramFile';
import { typeScriptFileHasCanonicalDeclarationRule } from './canonical-declaration/assertTypeScriptFileHasCanonicalDeclaration';

const ESTINANT_NAME = 'omitProgramCanoncalExportRequirement' as const;

const omitterSource = new EstinantSourceInstance({
  filePath: __filename,
  estinantName: ESTINANT_NAME,
});

/**
 * Creates an assertion omission for program files
 */
export const omitProgramCanoncalExportRequirement = buildEstinant({
  name: 'omitProgramCanoncalExportRequirement',
})
  .fromHubblepup2<EngineProgramFileVoque>({
    gepp: ENGINE_PROGRAM_FILE_GEPP,
  })
  .toHubblepup2<LintAssertionOmissionVoque>({
    gepp: LINT_ASSERTION_OMISSION_GEPP,
  })
  .onPinbe((engineFile) => {
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
