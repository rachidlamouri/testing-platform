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
  .andFromCollection2<BashFileStreamMetatype>({
    collectionId: BASH_FILE_COLLECTION_ID,
  })
  .toItem2<ExpectedProgramTestFileStreamMetatype>({
    collectionId: EXPECTED_PROGRAM_TEST_FILE_COLLECTION_ID,
  })
  .onTransform((configuration, bashFileCollection) => {
    return new ExpectedProgramTestFileInstance({
      configuration,
      testFile: bashFileCollection.byNodePath.get(configuration.testFilePath),
    });
  })
  .assemble();
