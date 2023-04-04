import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type EngineProgram = {
  programName: string;
  filePath: string;
  estinantIdentifierList: string[];
};

export type EngineProgramGrition = Grition<EngineProgram>;

export type EngineProgramOdeshin = OdeshinFromGrition<EngineProgramGrition>;

export const ENGINE_PROGRAM_GEPP = 'engine-program';

export type EngineProgramGepp = typeof ENGINE_PROGRAM_GEPP;

export type EngineProgramVoictent = Voictent<
  EngineProgramGepp,
  EngineProgramOdeshin
>;
