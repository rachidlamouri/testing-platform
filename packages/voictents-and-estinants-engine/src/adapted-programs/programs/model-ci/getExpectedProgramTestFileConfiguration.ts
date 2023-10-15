import { posix } from 'path';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  FileExistenceAsserterInputStreamMetatype,
  FILE_EXISTENCE_ASSERTER_INPUT_COLLECTION_ID,
  FileExistenceAsserterInputInstance,
} from '../../../layer-agnostic-utilities/assertion/fileExistenceAsserterInput';
import { ProgrammedTransformSourceInstance } from '../../programmable-units/linting/source/estinantSource';
import {
  ENGINE_PROGRAM_LOCATOR_3_COLLECTION_ID,
  EngineProgramLocator3StreamMetatype,
} from '../../programmable-units/engine-program/engineProgramLocator3';
import {
  EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_COLLECTION_ID,
  ExpectedProgramTestFileConfigurationInstance,
  ExpectedProgramTestFileConfigurationStreamMetatype,
} from './expectedProgramTestFileConfiguration';

const PROGRAMMED_TRANSFORM_NAME =
  'getExpectedProgramTestFileConfiguration' as const;

const requestor = new ProgrammedTransformSourceInstance({
  filePath: posix.relative('', __filename),
  programmedTransformName: PROGRAMMED_TRANSFORM_NAME,
});

/**
 * The source of truth for expected program test file file paths
 */
export const getExpectedProgramTestFileConfiguration = buildProgrammedTransform(
  {
    name: PROGRAMMED_TRANSFORM_NAME,
  },
)
  .fromItem2<EngineProgramLocator3StreamMetatype>({
    collectionId: ENGINE_PROGRAM_LOCATOR_3_COLLECTION_ID,
  })
  .toItem2<FileExistenceAsserterInputStreamMetatype>({
    collectionId: FILE_EXISTENCE_ASSERTER_INPUT_COLLECTION_ID,
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

    return {
      [FILE_EXISTENCE_ASSERTER_INPUT_COLLECTION_ID]:
        new FileExistenceAsserterInputInstance({
          filePath: expectedTestFilePath,
          requestor,
        }),
      [EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_COLLECTION_ID]:
        new ExpectedProgramTestFileConfigurationInstance({
          programName: programLocator.programName,
          programFile: programLocator.engineProgramFile,
          testFilePath: expectedTestFilePath,
        }),
    };
  })
  .assemble();
