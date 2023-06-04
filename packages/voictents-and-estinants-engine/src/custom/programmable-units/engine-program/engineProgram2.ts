import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { getTextDigest } from '../../../utilities/getTextDigest';
import { Tuple } from '../../../utilities/semantic-types/tuple';
import { EngineEstinant2 } from './engineEstinant2';
import {
  TEngineProgramLocator2,
  VoictentLocator,
} from './engineProgramLocator2';
import { EngineVoque } from './engineVoque';

type BaseEngineProgram2 = {
  programName: string;
  description: string;
  filePath: string;
  voictentLocatorList: VoictentLocator[];
  estinantList: Tuple<EngineEstinant2>;
  voqueList: Tuple<EngineVoque>;
  locator: TEngineProgramLocator2;
};

type EngineProgram2Prototype = {
  get zorn(): string;
  get id(): string;
};

/**
 * Represents an engine program in the program modeler
 */
type EngineProgram2 = ObjectWithPrototype<
  BaseEngineProgram2,
  EngineProgram2Prototype
>;

export const { EngineProgram2Instance } = buildConstructorFunctionWithName(
  'EngineProgram2Instance',
)<BaseEngineProgram2, EngineProgram2Prototype>({
  zorn: (engineProgram) => engineProgram.locator.zorn,
  id: (engineProgram) => getTextDigest(engineProgram.programName),
  // zorn: getEngineProgramLocatorZorn,
  // id: getZornableId,
});

export const ENGINE_PROGRAM_2_GEPP = 'engine-program-2';

type EngineProgram2Gepp = typeof ENGINE_PROGRAM_2_GEPP;

export type EngineProgram2Voque = InMemoryOdeshin2Voque<
  EngineProgram2Gepp,
  EngineProgram2
>;
