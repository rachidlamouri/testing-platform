import { posix } from 'path';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  FileExistenceAsserterInputStreamMetatype,
  FILE_EXISTENCE_ASSERTER_INPUT_COLLECTION_ID,
  FileExistenceAsserterInputInstance,
} from '../../../layer-agnostic-utilities/assertion/fileExistenceAsserterInput';
import { ProgrammedTransformSourceInstance } from '../../programmable-units/linting/source/estinantSource';
import {
  ENGINE_PROGRAM_LOCATOR_3_GEPP,
  EngineProgramLocator3Voque,
} from '../../programmable-units/engine-program/engineProgramLocator3';
import {
  EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_GEPP,
  ExpectedProgramTestFileConfigurationInstance,
  ExpectedProgramTestFileConfigurationVoque,
} from './expectedProgramTestFileConfiguration';

const ESTINANT_NAME = 'getExpectedProgramTestFileConfiguration' as const;

const requestor = new ProgrammedTransformSourceInstance({
  filePath: posix.relative('', __filename),
  programmedTransformName: ESTINANT_NAME,
});

/**
 * The source of truth for expected program test file file paths
 */
export const getExpectedProgramTestFileConfiguration = buildProgrammedTransform(
  {
    name: ESTINANT_NAME,
  },
)
  .fromItem2<EngineProgramLocator3Voque>({
    collectionId: ENGINE_PROGRAM_LOCATOR_3_GEPP,
  })
  .toItem2<FileExistenceAsserterInputStreamMetatype>({
    collectionId: FILE_EXISTENCE_ASSERTER_INPUT_COLLECTION_ID,
  })
  .toItem2<ExpectedProgramTestFileConfigurationVoque>({
    collectionId: EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_GEPP,
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
      [EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_GEPP]:
        new ExpectedProgramTestFileConfigurationInstance({
          programName: programLocator.programName,
          programFile: programLocator.engineProgramFile,
          testFilePath: expectedTestFilePath,
        }),
    };
  })
  .assemble();
