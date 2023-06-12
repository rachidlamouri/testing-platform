import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { Tuple } from '../../../utilities/semantic-types/tuple';
import { EngineEstinant2 } from './engineEstinant2';
import { VoictentLocator } from './engineProgramLocator2';
import { EngineVoque } from './engineVoque';

/**
 * Represents an engine program in the program modeler
 */
export type EngineProgram2 = {
  zorn: string;
  id: string;
  programName: string;
  description: string;
  filePath: string;
  voictentLocatorList: VoictentLocator[];
  estinantList: Tuple<EngineEstinant2>;
  voqueList: Tuple<EngineVoque>;
};

export const ENGINE_PROGRAM_2_GEPP = 'engine-program-2';

type EngineProgram2Gepp = typeof ENGINE_PROGRAM_2_GEPP;

export type EngineProgram2Voque = InMemoryOdeshin2Voque<
  EngineProgram2Gepp,
  EngineProgram2
>;
