import fs from 'fs';
import { posix } from 'path';
import {
  LINT_ASSERTION_GEPP,
  LintAssertion,
  LintAssertionVoque,
} from '../../adapted-programs/programmable-units/linting/lintAssertion';
import { TypedRule } from '../../adapted-programs/programmable-units/linting/rule';
import { EstinantSourceInstance } from '../../adapted-programs/programmable-units/linting/source/estinantSource';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  FILE_EXISTENCE_ASSERTER_INPUT_GEPP,
  FileExistenceAsserterInputVoque,
} from './fileExistenceAsserterInput';

const ESTINANT_NAME = 'assertFileExists' as const;
const ruleSource = new EstinantSourceInstance({
  estinantName: ESTINANT_NAME,
  filePath: posix.relative('', __filename),
});

type MessageContext = { filePath: string };
const rule = new TypedRule<MessageContext>({
  name: 'file-exists',
  source: ruleSource,
  description:
    'Anything that depends on a file existing should run this rule in parallel.',
  getErrorMessage: ({ filePath }): string => {
    return `File ${filePath} does not exist.`;
  },
});

/**
 * Asserts that a given file exists
 */
export const assertFileExists = buildEstinant({
  name: 'assertFileExists',
})
  .fromHubblepup2<FileExistenceAsserterInputVoque>({
    gepp: FILE_EXISTENCE_ASSERTER_INPUT_GEPP,
  })
  .toHubblepup2<LintAssertionVoque>({
    gepp: LINT_ASSERTION_GEPP,
  })
  .onPinbe((assertionInput) => {
    const assertion = new LintAssertion({
      rule,
      lintSource: assertionInput.requestSource,
      isValid: fs.existsSync(assertionInput.filePath),
      errorMessageContext: {
        filePath: assertionInput.filePath,
      },
      context: {
        assertionInput,
      },
    });

    return assertion;
  })
  .assemble();
