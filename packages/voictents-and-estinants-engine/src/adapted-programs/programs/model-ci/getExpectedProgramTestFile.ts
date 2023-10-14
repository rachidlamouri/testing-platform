import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
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
export const getExpectedProgramTestFile = buildProgrammedTransform({
  name: 'getExpectedProgramTestFile',
})
  .fromItem2<ExpectedProgramTestFileConfigurationVoque>({
    collectionId: EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_GEPP,
  })
  .andFromHubblepupTuple2<BashFileVoque, [string]>({
    collectionId: BASH_FILE_GEPP,
    getRightKeyTuple: (expectedProgram) => {
      return [expectedProgram.item.testFilePath];
    },
    getRightKey: (file) => {
      return file.item.filePath.serialized;
    },
  })
  .toItem2<ExpectedProgramTestFileVoque>({
    collectionId: EXPECTED_PROGRAM_TEST_FILE_GEPP,
  })
  .onTransform((configuration, [testFile]) => {
    return new ExpectedProgramTestFileInstance({
      programName: configuration.programName,
      programFile: configuration.programFile,
      testFile,
    });
  })
  .assemble();
