import { posix } from 'path';
import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import {
  FileExistenceAsserterInputVoque,
  FILE_EXISTENCE_ASSERTER_INPUT_GEPP,
  FileExistenceAsserterInputInstance,
} from '../../../layer-agnostic-utilities/assertion/fileExistenceAsserterInput';
import { EstinantSourceInstance } from '../../programmable-units/linting/source/estinantSource';
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

const requestor = new EstinantSourceInstance({
  filePath: posix.relative('', __filename),
  estinantName: ESTINANT_NAME,
});

/**
 * The source of truth for expected program test file file paths
 */
export const getExpectedProgramTestFileConfiguration = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<EngineProgramLocator3Voque>({
    gepp: ENGINE_PROGRAM_LOCATOR_3_GEPP,
  })
  .toHubblepup2<FileExistenceAsserterInputVoque>({
    gepp: FILE_EXISTENCE_ASSERTER_INPUT_GEPP,
  })
  .toHubblepup2<ExpectedProgramTestFileConfigurationVoque>({
    gepp: EXPECTED_PROGRAM_TEST_FILE_CONFIGURATION_GEPP,
  })
  .onPinbe((programLocator) => {
    const extensionlessFileName =
      programLocator.engineProgramFile.filePath.name.extensionless;
    const { parentDirectoryPath } = programLocator.engineProgramFile.filePath;
    const testFileName = `${extensionlessFileName}.test.sh`;
    const expectedTestFilePath = posix.join(parentDirectoryPath, testFileName);

    return {
      [FILE_EXISTENCE_ASSERTER_INPUT_GEPP]:
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
