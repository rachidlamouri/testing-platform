import { posix } from 'path';
import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import {
  ENGINE_PROGRAM_LOCATOR_3_GEPP,
  EngineProgramLocator3Voque,
} from '../engine-program/engineProgramLocator3';
import { LintAssertionZorn } from '../linting/lintAssertion';
import {
  LINT_ASSERTION_OMISSION_GEPP,
  LintAssertionOmissionInstance,
  LintAssertionOmissionVoque,
} from '../linting/lintAssertionOmission';
import { EstinantSourceInstance } from '../linting/source/estinantSource';
import { FileSourceInstance } from '../linting/source/fileSource';
import { typeScriptFileHasCanonicalCommentRule } from './assertTypeScriptFileHasCanonialComment';

const ESTINANT_NAME = 'exemptEngineProgramFromCanonicalComment' as const;

/**
 * The call to the engine is the canonical statement for an engine program
 *
 * @todo canonical declaration should be renamed to canonical statement
 *
 * @todo this transform shouldn't exist. the lint assertion for canonical
 * comments should be agnostic of canonical declarations. There should be
 * multiple transforms to check for canonical comments and the results of those
 * transforms should get aggregated and sent to the lint assertion transform
 */
export const exemptEngineProgramFromCanonicalComment = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<EngineProgramLocator3Voque>({
    gepp: ENGINE_PROGRAM_LOCATOR_3_GEPP,
  })
  .toHubblepup2<LintAssertionOmissionVoque>({
    gepp: LINT_ASSERTION_OMISSION_GEPP,
  })
  .onPinbe((programLocator) => {
    return new LintAssertionOmissionInstance({
      omitterSource: new EstinantSourceInstance({
        filePath: posix.resolve('', __filename),
        estinantName: ESTINANT_NAME,
      }),
      omittedAssertionZorn: new LintAssertionZorn({
        rule: typeScriptFileHasCanonicalCommentRule,
        lintSource: new FileSourceInstance({
          filePath: programLocator.filePath,
        }),
      }),
    });
  })
  .assemble();
