import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_PROGRAM_GEPP,
  EngineProgramVoictent,
} from '../engine-program/engineProgram';
import {
  FILTERED_ENGINE_PROGRAM_GEPP,
  FilteredEngineProgramVoictent,
} from './filteredEngineProgram';

const IGNORED_FILE_PATH_SET = new Set([
  // this one should probably just get deleted. We have test typed datum now which tests serialization
  'packages/voictents-and-estinants-engine/src/custom/programs/test-serialize/testSerialize.ts',
]);

export const filterEngineProgramList = buildEstinant({
  name: 'filterEngineProgramList',
})
  .fromOdeshinVoictent<EngineProgramVoictent>({
    gepp: ENGINE_PROGRAM_GEPP,
  })
  .toHubblepupTuple<FilteredEngineProgramVoictent>({
    gepp: FILTERED_ENGINE_PROGRAM_GEPP,
  })
  .onPinbe((inputList) => {
    return inputList
      .filter((input) => {
        return !IGNORED_FILE_PATH_SET.has(input.filePath);
      })
      .map((input) => {
        return {
          zorn: input.programName,
          grition: input,
        };
      });
  })
  .assemble();
