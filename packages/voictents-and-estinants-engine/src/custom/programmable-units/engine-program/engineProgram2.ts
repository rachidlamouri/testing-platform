import { Tuple } from '../../../utilities/semantic-types/tuple';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import { EngineEstinant2 } from './engineEstinant2';

export type EngineProgram2 = {
  id: string;
  programName: string;
  description: string;
  filePath: string;
  initialVoictentNameList: string[];
  estinantList: Tuple<EngineEstinant2>;
};

export type EngineProgram2Grition = Grition<EngineProgram2>;

export type EngineProgram2Odeshin = OdeshinFromGrition<EngineProgram2Grition>;

export const ENGINE_PROGRAM_2_GEPP = 'engine-program-2';

export type EngineProgram2Gepp = typeof ENGINE_PROGRAM_2_GEPP;

export type EngineProgram2Voictent = Voictent<
  EngineProgram2Gepp,
  EngineProgram2Odeshin
>;
