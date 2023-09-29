import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  BASH_FILE_GEPP,
  BashFileVoque,
} from '../../programmable-units/bash-file/bashFile';
import {
  EXPECTED_PROGRAM_TEST_FILE_GEPP,
  ExpectedProgramTestFileInstance,
  ExpectedProgramTestFileVoque,
} from './expectedProgramTestFile';
import {
  EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_GEPP,
  ExpectedProgramTestFileConfigurationVoque,
} from './expectedProgramTestFileConfiguration';

/**
 * Locates the file object for a program test file
 */
export const getExpectedProgramTestFile = buildEstinant({
  name: 'getExpectedProgramTestFile',
})
  .fromHubblepup2<ExpectedProgramTestFileConfigurationVoque>({
    gepp: EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_GEPP,
  })
  .andFromHubblepupTuple2<BashFileVoque, [string]>({
    gepp: BASH_FILE_GEPP,
    framate: (expectedProgram) => {
      return [expectedProgram.hubblepup.testFilePath];
    },
    croard: (file) => {
      return file.hubblepup.filePath.serialized;
    },
  })
  .toHubblepup2<ExpectedProgramTestFileVoque>({
    gepp: EXPECTED_PROGRAM_TEST_FILE_GEPP,
  })
  .onPinbe((configuration, [testFile]) => {
    return new ExpectedProgramTestFileInstance({
      programName: configuration.programName,
      programFile: configuration.programFile,
      testFile,
    });
  })
  .assemble();
