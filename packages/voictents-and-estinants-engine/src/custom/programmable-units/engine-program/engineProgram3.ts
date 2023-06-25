import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { getZornableId } from '../../../utilities/getZornableId';
import { Tuple } from '../../../utilities/semantic-types/tuple';
import { RootGraphLocator } from '../graph-visualization/directed-graph/rootGraphLocator';
import { EngineEstinant3 } from './engineEstinant3';
import { EngineProgramLocator3 } from './engineProgramLocator3';
import { EngineVoqueLocator2 } from './engineVoqueLocator2';
import { getEngineProgramZorn } from './partialEngineProgramLocator2';

type BaseEngineProgram3 = {
  programName: string;
  description: string;
  filePath: string;
  estinantList: Tuple<EngineEstinant3>;
  initializedVoqueLocatorList: EngineVoqueLocator2[];
  endingVoqueLocatorList: EngineVoqueLocator2[];
  locator: EngineProgramLocator3;
  rootGraphLocator: RootGraphLocator;
};

type EngineProgram3Prototype = {
  get zorn(): string;
  get id(): string;
};

/**
 * Represents an engine program in the program modeler
 */
type EngineProgram3 = ObjectWithPrototype<
  BaseEngineProgram3,
  EngineProgram3Prototype
>;

export const { EngineProgram3Instance } = buildConstructorFunctionWithName(
  'EngineProgram3Instance',
)<BaseEngineProgram3, EngineProgram3Prototype>({
  zorn: getEngineProgramZorn,
  id: getZornableId,
});

export const ENGINE_PROGRAM_3_GEPP = 'engine-program-3';

type EngineProgram3Gepp = typeof ENGINE_PROGRAM_3_GEPP;

export type EngineProgram3Voque = InMemoryOdeshin2Voque<
  EngineProgram3Gepp,
  EngineProgram3
>;