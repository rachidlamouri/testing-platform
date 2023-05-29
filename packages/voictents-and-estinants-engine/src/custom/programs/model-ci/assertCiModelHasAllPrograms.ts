import assert from 'assert';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_PROGRAM_LOCATOR_2_GEPP,
  EngineProgramLocator2Voque,
} from '../../programmable-units/engine-program/engineProgramLocator2';
import { CI_MODEL_GEPP, CI_MODEL_ZORN, CiModelVoque } from './ciModel';
import {
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  GenericProgramErrorVoque,
  ReportedProgramError,
  ReportingEstinantLocator,
} from '../../programmable-units/error/programError';

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
  .fromVoictent2<EngineProgramLocator2Voque>({
    gepp: ENGINE_PROGRAM_LOCATOR_2_GEPP,
  })
  .andFromHubblepupTuple2<CiModelVoque, [string]>({
    gepp: CI_MODEL_GEPP,
    framate: () => [CI_MODEL_ZORN],
    croard: (rightInput) => rightInput.hubblepup.zorn,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((programLocatorList, [ciModel]) => {
    type ComparisonDatum = {
      name: string;
      filePath: string;
    };

    const foo = (a: ComparisonDatum, b: ComparisonDatum): number => {
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
              filePath: programTest.programFilePath,
            };
          },
        );
      })
      .sort(foo);

    const expectedList = programLocatorList
      .map<ComparisonDatum>((locator) => {
        return {
          name: locator.programName,
          filePath: locator.filePath,
        };
      })
      .sort(foo);

    const expectedCodeList = expectedList
      .flatMap(({ name, filePath }) => {
        return [
          '{',
          `  programName: '${name}',`,
          `  programFilePath: '${filePath}',`,
          '  prefaceDescription: "",',
          '},',
        ];
      })
      .join('\n');

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
              'packages/voictents-and-estinants-engine/src/custom/programs/model-ci/ciModel.ts',
          },
          context: {
            error,
            expectedCodeList,
          },
        } satisfies ReportedProgramError<ReportingLocator>,
      ];
    }
  })
  .assemble();
