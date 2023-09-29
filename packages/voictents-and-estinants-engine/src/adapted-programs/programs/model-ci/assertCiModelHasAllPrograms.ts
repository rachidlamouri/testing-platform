import assert from 'assert';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { CI_MODEL_GEPP, CI_MODEL_ZORN, CiModelVoque } from './ciModel';
import {
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  GenericProgramErrorVoque,
  ReportedProgramError,
  ReportingEstinantLocator,
} from '../../programmable-units/error/programError';
import {
  ENGINE_PROGRAM_LOCATOR_3_GEPP,
  EngineProgramLocator3Voque,
} from '../../programmable-units/engine-program/engineProgramLocator3';
import { OdeshinZorn } from '../../../adapter/odeshin/odeshin2';
import {
  EXPECTED_PROGRAM_TEST_FILE_GEPP,
  ExpectedProgramTestFileVoque,
} from './expectedProgramTestFile';

const ESTINANT_NAME = 'assertCiModelHasAllPrograms' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

/**
 * Produces a ProgramError if the CI model does not contain a ProgramTest for
 * each engine program identified by the engine program locator
 */
export const assertCiModelHasAllPrograms = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromVoictent2<EngineProgramLocator3Voque>({
    gepp: ENGINE_PROGRAM_LOCATOR_3_GEPP,
  })
  .andFromHubblepupTuple2<CiModelVoque, [OdeshinZorn]>({
    // TODO: make a better pattern for singletons
    gepp: CI_MODEL_GEPP,
    framate: () => [CI_MODEL_ZORN],
    croard: (rightInput) => rightInput.hubblepup.zorn,
  })
  .andFromVoictent2<ExpectedProgramTestFileVoque>({
    gepp: EXPECTED_PROGRAM_TEST_FILE_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((programLocatorList, [ciModel], expectedTestFileVoictent) => {
    const testFilePathByProgramFilePath = new Map(
      expectedTestFileVoictent.map((expectedTestFile) => {
        return [
          expectedTestFile.programFile.filePath.serialized,
          expectedTestFile.testFile.filePath.serialized,
        ];
      }),
    );

    type ComparisonDatum = {
      name: string;
      filePath?: string;
    };

    const compareNames = (a: ComparisonDatum, b: ComparisonDatum): number => {
      if (a.name === b.name) {
        return 0;
      }

      if (a.name < b.name) {
        return -1;
      }

      return 1;
    };

    const actualList = ciModel.programTestGroupList
      .flatMap((programTestGroup) => {
        return programTestGroup.programTestList.map<ComparisonDatum>(
          (programTest) => {
            return {
              name: programTest.programName,
              filePath: programTest.testFilePath,
            };
          },
        );
      })
      .sort(compareNames);

    const expectedList = programLocatorList
      .map<ComparisonDatum>((locator) => {
        const testFilePath = testFilePathByProgramFilePath.get(
          locator.filePath,
        );

        return {
          name: locator.programName,
          filePath: testFilePath,
        };
      })
      .sort(compareNames);

    try {
      assert.deepStrictEqual(actualList, expectedList);
      return [];
    } catch (error) {
      return [
        {
          name: 'missing-program-test-list',
          error: new Error(
            'ciModel.ts program name list does not match expected list',
          ),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
            filePath:
              'packages/voictents-and-estinants-engine/src/adapted-programs/programs/model-ci/ciModel.ts',
          },
          context: {
            error,
          },
        } satisfies ReportedProgramError<ReportingLocator>,
      ];
    }
  })
  .assemble();
