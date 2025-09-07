import { posix } from 'path';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  ENGINE_PROGRAM_LOCATOR_3_COLLECTION_ID,
  EngineProgramLocator3StreamMetatype,
} from '../../programmable-units/engine-program-model/engineProgramLocator3';
import {
  EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_COLLECTION_ID,
  ExpectedProgramTestFileConfigurationInstance,
  ExpectedProgramTestFileConfigurationStreamMetatype,
} from './expectedProgramTestFileConfiguration';

/**
 * The source of truth for expected program test file file paths
 */
export const getExpectedProgramTestFileConfiguration = buildProgrammedTransform(
  {
    name: 'getExpectedProgramTestFileConfiguration',
  },
)
  .fromItem2<EngineProgramLocator3StreamMetatype>({
    collectionId: ENGINE_PROGRAM_LOCATOR_3_COLLECTION_ID,
  })
  .toItem2<ExpectedProgramTestFileConfigurationStreamMetatype>({
    collectionId: EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_COLLECTION_ID,
  })
  .onTransform((programLocator) => {
    const extensionlessFileName =
      programLocator.engineProgramFile.filePath.name.extensionless;
    const { parentDirectoryPath } = programLocator.engineProgramFile.filePath;
    const testFileName = `${extensionlessFileName}.test.sh`;
    const expectedTestFilePath = posix.join(parentDirectoryPath, testFileName);

    return new ExpectedProgramTestFileConfigurationInstance({
      programName: programLocator.programName,
      programFile: programLocator.engineProgramFile,
      testFilePath: expectedTestFilePath,
    });
  })
  .assemble();
