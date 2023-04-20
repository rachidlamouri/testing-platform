import { Tuple } from '../../../utilities/semantic-types/tuple';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import { EngineEstinant } from './engineEstinant';

export type EngineProgram = {
  id: string;
  programName: string;
  filePath: string;
  estinantList: Tuple<EngineEstinant>;
};

export type EngineProgramGrition = Grition<EngineProgram>;

export type EngineProgramOdeshin = OdeshinFromGrition<EngineProgramGrition>;

export const ENGINE_PROGRAM_GEPP = 'engine-program';

export type EngineProgramGepp = typeof ENGINE_PROGRAM_GEPP;

export type EngineProgramVoictent = Voictent<
  EngineProgramGepp,
  EngineProgramOdeshin
>;
