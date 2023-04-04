import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import { EngineProgram } from '../engine-program/engineProgram';

export type FilteredEngineProgram = EngineProgram;

export type FilteredEngineProgramGrition = Grition<FilteredEngineProgram>;

export type FilteredEngineProgramOdeshin =
  OdeshinFromGrition<FilteredEngineProgramGrition>;

export const FILTERED_ENGINE_PROGRAM_GEPP = 'filtered-engine-program';

export type FilteredEngineProgramGepp = typeof FILTERED_ENGINE_PROGRAM_GEPP;

export type FilteredEngineProgramVoictent = Voictent<
  FilteredEngineProgramGepp,
  FilteredEngineProgramOdeshin
>;
