import fs from 'fs';
import { posix } from 'path';
import {
  LINT_ASSERTION_COLLECTION_ID,
  LintAssertion,
  LintAssertionStreamMetatype,
} from '../../adapted-programs/programmable-units/linting/lintAssertion';
import { TypedRule } from '../../adapted-programs/programmable-units/linting/rule';
import { ProgrammedTransformSourceInstance } from '../../adapted-programs/programmable-units/linting/source/estinantSource';
import { buildProgrammedTransform } from '../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  FILE_EXISTENCE_ASSERTER_INPUT_COLLECTION_ID,
  FileExistenceAsserterInputStreamMetatype,
} from './fileExistenceAsserterInput';

const PROGRAMMED_TRANSFORM_NAME = 'assertFileExists' as const;
const ruleSource = new ProgrammedTransformSourceInstance({
  programmedTransformName: PROGRAMMED_TRANSFORM_NAME,
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
export const assertFileExists = buildProgrammedTransform({
  name: 'assertFileExists',
})
  .fromItem2<FileExistenceAsserterInputStreamMetatype>({
    collectionId: FILE_EXISTENCE_ASSERTER_INPUT_COLLECTION_ID,
  })
  .toItem2<LintAssertionStreamMetatype>({
    collectionId: LINT_ASSERTION_COLLECTION_ID,
  })
  .onTransform((assertionInput) => {
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
