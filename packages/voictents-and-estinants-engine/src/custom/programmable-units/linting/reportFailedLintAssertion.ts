import { assertNotNull } from '../../../utilities/assertNotNull';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  GenericProgramErrorVoque,
  PROGRAM_ERROR_GEPP,
} from '../error/programError';
import {
  GenericLintAssertion,
  LINT_ASSERTION_GEPP,
  LintAssertionVoque,
} from './lintAssertion';

export class LintAssertionError extends Error {
  constructor(public readonly lintAssertion: GenericLintAssertion) {
    assertNotNull(lintAssertion.result.errorMessage);

    super(lintAssertion.result.errorMessage);
  }
}

/**
 * Forwards failed LintAssertion objects to the error collection
 */
export const reportFailedLintAssertion = buildEstinant({
  name: 'reportFailedLintAssertion',
})
  .fromHubblepup2<LintAssertionVoque>({
    gepp: LINT_ASSERTION_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((lintAssertion) => {
    if (lintAssertion.result.isValid) {
      return [];
    }

    return [new LintAssertionError(lintAssertion)];
  })
  .assemble();
