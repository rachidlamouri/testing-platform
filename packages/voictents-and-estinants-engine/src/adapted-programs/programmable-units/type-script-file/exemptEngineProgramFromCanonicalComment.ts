import { posix } from 'path';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  ENGINE_PROGRAM_LOCATOR_3_COLLECTION_ID,
  EngineProgramLocator3StreamMetatype,
} from '../engine-program/engineProgramLocator3';
import { LintAssertionZorn } from '../linting/lintAssertion';
import {
  LINT_ASSERTION_OMISSION_COLLECTION_ID,
  LintAssertionOmissionInstance,
  LintAssertionOmissionStreamMetatype,
} from '../linting/lintAssertionOmission';
import { ProgrammedTransformSourceInstance } from '../linting/source/estinantSource';
import { FileSourceInstance } from '../linting/source/fileSource';
import { typeScriptFileHasCanonicalCommentRule } from './assertTypeScriptFileHasCanonicalComment';

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
export const exemptEngineProgramFromCanonicalComment = buildProgrammedTransform(
  {
    name: ESTINANT_NAME,
  },
)
  .fromItem2<EngineProgramLocator3StreamMetatype>({
    collectionId: ENGINE_PROGRAM_LOCATOR_3_COLLECTION_ID,
  })
  .toItem2<LintAssertionOmissionStreamMetatype>({
    collectionId: LINT_ASSERTION_OMISSION_COLLECTION_ID,
  })
  .onTransform((programLocator) => {
    return new LintAssertionOmissionInstance({
      omitterSource: new ProgrammedTransformSourceInstance({
        filePath: posix.resolve('', __filename),
        programmedTransformName: ESTINANT_NAME,
      }),
      omittedAssertionId: new LintAssertionZorn({
        rule: typeScriptFileHasCanonicalCommentRule,
        lintSource: new FileSourceInstance({
          filePath: programLocator.filePath,
        }),
      }),
    });
  })
  .assemble();
