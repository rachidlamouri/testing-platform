import fs from 'fs';
import { posix } from 'path';
import chalk from 'chalk';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  GenericLintAssertion,
  LINT_ASSERTION_COLLECTION_ID,
  LintAssertion,
  LintAssertionStreamMetatype,
} from '../../programmable-units/linting/lintAssertion';
import {
  EXPECTED_PROGRAM_TEST_FILE_COLLECTION_ID,
  ExpectedProgramTestFileStreamMetatype,
} from './expectedProgramTestFile';
import { ProgrammedTransformSourceInstance } from '../../programmable-units/linting/source/estinantSource';
import { TypedRule } from '../../programmable-units/linting/rule';
import { FileSourceInstance } from '../../programmable-units/linting/source/fileSource';
import { TypeScriptObjectInstance } from '../../../package-agnostic-utilities/object/typeScriptObject';
import {
  LINT_ASSERTION_OMISSION_COLLECTION_ID,
  LintAssertionOmissionInstance,
  LintAssertionOmissionStreamMetatype,
} from '../../programmable-units/linting/lintAssertionOmission';

const PROGRAMMED_TRANSFORM_NAME = 'assertProgramTestFileIsValid' as const;

const ruleSource = new ProgrammedTransformSourceInstance({
  filePath: posix.relative('', __filename),
  programmedTransformName: PROGRAMMED_TRANSFORM_NAME,
});

const programTestFileExitsImmediately = new TypedRule<{ testFilePath: string }>(
  {
    name: 'program-test-file-exits-immediately',
    source: ruleSource,
    description: 'Bash test files should exit on the first failure',
    getErrorMessage: ({ testFilePath }): string => {
      const missingCommand = chalk.blue('set -e');
      return `Test file ${testFilePath} is missing ${missingCommand}`;
    },
  },
);

type MessageContext = {
  testFilePath: string;
  programName: string;
  programFilePath: string;
};

const programTestFileEmitsProgramName = new TypedRule<MessageContext>({
  name: 'program-test-file-emits-program-name',
  source: ruleSource,
  description: 'Program test files must log the program name',
  getErrorMessage: ({ testFilePath, programName }): string => {
    const missingCommand = chalk.blue(`echo "# ${programName}"`);
    return `Test file ${testFilePath} is missing ${missingCommand}`;
  },
});

const programTestFileEmitsDescription = new TypedRule<MessageContext>({
  name: 'program-test-file-emits-description',
  source: ruleSource,
  description:
    'Program test files must log a description of what the test is testing.',
  getErrorMessage: ({ testFilePath }): string => {
    const example = chalk.blue('echo "Testing this works"');
    return `Test file ${testFilePath} is missing an emitted description that starts with a word that ends in "ing". Eg: ${example}`;
  },
});

const programTestFileRunsProgram = new TypedRule<MessageContext>({
  name: 'program-test-file-runs-program',
  source: ruleSource,
  description: 'Program test files must actually run the program',
  getErrorMessage: ({ testFilePath, programFilePath }): string => {
    const missingCommand1 = chalk.blue(`npx ts-node ${programFilePath}`);
    const missingCommand2 = chalk.blue(`# custom`);
    return `Test file ${testFilePath} is missing ${missingCommand1} or one or more commands after a ${missingCommand2} directive`;
  },
});

// TODO: the assertion should specify which debug subfolder to check
// TODO: tests should also assert that snapshot files were recently modified
const programTestFileMakesAnAssertion = new TypedRule<MessageContext>({
  name: 'program-test-file-makes-an-assertion',
  source: ruleSource,
  description: 'Program test files must assert something',
  getErrorMessage: ({ testFilePath }): string => {
    const missingCommand = chalk.blue(`bash checkUncommittedDebug.sh`);
    return `Test file ${testFilePath} is missing ${missingCommand}`;
  },
});

/**
 * Enforces the structure of a program test file
 */
export const assertProgramTestFileIsValid = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromItem2<ExpectedProgramTestFileStreamMetatype>({
    collectionId: EXPECTED_PROGRAM_TEST_FILE_COLLECTION_ID,
  })
  .toItemTuple2<LintAssertionStreamMetatype>({
    collectionId: LINT_ASSERTION_COLLECTION_ID,
  })
  .toItemTuple2<LintAssertionOmissionStreamMetatype>({
    collectionId: LINT_ASSERTION_OMISSION_COLLECTION_ID,
  })
  .onTransform((expectedFile) => {
    const { programName } = expectedFile;
    const programFilePath = expectedFile.programFile.filePath.serialized;

    const testFilePath = expectedFile.testFile.filePath.serialized;
    const fileContents = fs.readFileSync(testFilePath, 'utf8');

    const lintSource = new FileSourceInstance({
      filePath: testFilePath,
    });

    const errorMessageContext: MessageContext = {
      programName,
      testFilePath,
      programFilePath,
    };

    const assertionContext: TypeScriptObjectInstance = {
      testFile: expectedFile,
      fileContents,
    };

    // note: reversing so we can use "pop" to traverse lines in order
    const mutableLineList = fileContents.split('\n').reverse();

    const firstLine = mutableLineList.pop();
    const isSkipped = firstLine === '# skip';

    const programTestFileExitsImmediatelyAssertion = new LintAssertion({
      rule: programTestFileExitsImmediately,
      lintSource,
      isValid: firstLine === 'set -e',
      errorMessageContext,
      context: assertionContext,
    });

    // note: second line should be empty
    mutableLineList.pop();

    const thirdLine = mutableLineList.pop();

    const programTestFileEmitsProgramNameAssertion = new LintAssertion({
      rule: programTestFileEmitsProgramName,
      lintSource,
      isValid: thirdLine === `echo "# ${programName}"`,
      errorMessageContext,
      context: assertionContext,
    });

    const fourthLine = mutableLineList.pop();

    const programTestFileEmitsDescriptionAssertion = new LintAssertion({
      rule: programTestFileEmitsDescription,
      lintSource,
      isValid:
        fourthLine !== undefined && /^echo "[^\s]+ing .+"$/.test(fourthLine),
      errorMessageContext,
      context: assertionContext,
    });

    const fifthLine = mutableLineList.pop();
    const sixthLine = mutableLineList.pop() ?? '';

    const hasCustomDirective = fifthLine === '# custom';

    let nextLine: string | undefined;
    let programTestFileRunsProgramAssertion: GenericLintAssertion;
    if (hasCustomDirective) {
      programTestFileRunsProgramAssertion = new LintAssertion({
        rule: programTestFileRunsProgram,
        lintSource,
        isValid: sixthLine.trim() !== '',
        errorMessageContext,
        context: assertionContext,
      });

      nextLine = sixthLine;
      while (nextLine !== undefined && nextLine !== '') {
        nextLine = mutableLineList.pop();
      }

      // note: we want the line after the first empty line
      nextLine = mutableLineList.pop();
    } else {
      programTestFileRunsProgramAssertion = new LintAssertion({
        rule: programTestFileRunsProgram,
        lintSource,
        isValid: fifthLine === `npx ts-node ${programFilePath}`,
        errorMessageContext,
        context: assertionContext,
      });

      nextLine = sixthLine;
    }

    const programTestFileMakesAnAssertionAssertion = new LintAssertion({
      rule: programTestFileMakesAnAssertion,
      lintSource,
      isValid: nextLine === 'bash checkUncommittedDebug.sh',
      errorMessageContext,
      context: assertionContext,
    });

    const assertionList: GenericLintAssertion[] = [
      programTestFileExitsImmediatelyAssertion,
      programTestFileEmitsProgramNameAssertion,
      programTestFileEmitsDescriptionAssertion,
      programTestFileRunsProgramAssertion,
      programTestFileMakesAnAssertionAssertion,
    ];

    const omissionList = isSkipped
      ? assertionList.map((assertion) => {
          return new LintAssertionOmissionInstance({
            omitterSource: ruleSource,
            omittedAssertionId: assertion.id,
          });
        })
      : [];

    return {
      [LINT_ASSERTION_COLLECTION_ID]: assertionList,
      [LINT_ASSERTION_OMISSION_COLLECTION_ID]: omissionList,
    };
  })
  .assemble();
