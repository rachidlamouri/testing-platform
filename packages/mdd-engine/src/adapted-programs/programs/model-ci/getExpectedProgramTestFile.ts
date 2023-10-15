import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  BASH_FILE_COLLECTION_ID,
  BashFileStreamMetatype,
} from '../../programmable-units/bash-file/bashFile';
import {
  EXPECTED_PROGRAM_TEST_FILE_COLLECTION_ID,
  ExpectedProgramTestFileInstance,
  ExpectedProgramTestFileStreamMetatype,
} from './expectedProgramTestFile';
import {
  EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_COLLECTION_ID,
  ExpectedProgramTestFileConfigurationStreamMetatype,
} from './expectedProgramTestFileConfiguration';

/**
 * Locates the file object for a program test file
 */
export const getExpectedProgramTestFile = buildProgrammedTransform({
  name: 'getExpectedProgramTestFile',
})
  .fromItem2<ExpectedProgramTestFileConfigurationStreamMetatype>({
    collectionId: EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_COLLECTION_ID,
  })
  .andFromItemTuple2<BashFileStreamMetatype, [string]>({
    collectionId: BASH_FILE_COLLECTION_ID,
    getRightKeyTuple: (expectedProgram) => {
      return [expectedProgram.item.testFilePath];
    },
    getRightKey: (file) => {
      return file.item.filePath.serialized;
    },
  })
  .toItem2<ExpectedProgramTestFileStreamMetatype>({
    collectionId: EXPECTED_PROGRAM_TEST_FILE_COLLECTION_ID,
  })
  .onTransform((configuration, [testFile]) => {
    return new ExpectedProgramTestFileInstance({
      programName: configuration.programName,
      programFile: configuration.programFile,
      testFile,
    });
  })
  .assemble();
