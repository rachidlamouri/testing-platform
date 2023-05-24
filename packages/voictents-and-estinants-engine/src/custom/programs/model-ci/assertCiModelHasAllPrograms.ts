import assert from 'assert';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_PROGRAM_LOCATOR_2_GEPP,
  EngineProgramLocator2Voque,
} from '../../programmable-units/engine-program/engineProgramLocator2';
import {
  ErrorLocatorTypeName,
  PROGRAM_ERROR_GEPP,
  ProgramErrorVoque,
} from '../../programmable-units/error/programError';
import { CI_MODEL_GEPP, CI_MODEL_ZORN, CiModelVoque } from './ciModel';

/**
 * Produces a ProgramError if the CI model does not contain a ProgramTest for
 * each engine program identified by the engine program locator
 */
export const assertCiModelHasAllPrograms = buildEstinant({
  name: 'assertCiModelHasAllPrograms',
})
  .fromVoictent2<EngineProgramLocator2Voque>({
    gepp: ENGINE_PROGRAM_LOCATOR_2_GEPP,
  })
  .andFromHubblepupTuple2<CiModelVoque, [string]>({
    gepp: CI_MODEL_GEPP,
    framate: () => [CI_MODEL_ZORN],
    croard: (rightInput) => rightInput.hubblepup.zorn,
  })
  .toHubblepupTuple2<ProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((programLocatorList, [ciModel]) => {
    const actualList = ciModel.programTestList.map(
      (programTest) => programTest.programName,
    );

    const expectedList = programLocatorList.map(
      (locator) => locator.programName,
    );

    try {
      assert.deepEqual(actualList, expectedList);
      return [];
    } catch (error) {
      return [
        {
          errorId: 'assertCiModelHasAllPrograms/missing-program-test-list',
          message: 'ciModel.ts program name list does not match expected list',
          locator: {
            typeName: ErrorLocatorTypeName.FileErrorLocator,
            filePath:
              'packages/voictents-and-estinants-engine/src/custom/programs/model-ci/ciModel.ts',
          },
          metadata: {
            error,
          },
        },
      ];
    }
  })
  .assemble();
