import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { getTextDigest } from '../../../utilities/getTextDigest';
import { getZornableId } from '../../../utilities/getZornableId';
import { Tuple } from '../../../utilities/semantic-types/tuple';
import { EngineEstinant2 } from './engineEstinant2';
import {
  EngineProgramLocator2,
  VoictentLocator,
} from './engineProgramLocator2';
import { EngineVoque } from './engineVoque';
import { getEngineProgramZorn } from './partialEngineProgramLocator2';

type BaseEngineProgram2 = {
  programName: string;
  description: string;
  filePath: string;
  voictentLocatorList: VoictentLocator[];
  estinantList: Tuple<EngineEstinant2>;
  allVoqueList: Tuple<EngineVoque>;
  initializedVoqueList: Tuple<EngineVoque>;
  endingVoqueList: Tuple<EngineVoque>;
  locator: EngineProgramLocator2;
};

type EngineProgram2Prototype = {
  get zorn(): string;
  get id(): string;
  get startingSubgraphId(): string;
  get startingNodeId(): string;
  get endingSubgraphId(): string;
  get endingNodeId(): string;
};

/**
 * Represents an engine program in the program modeler
 */
export type EngineProgram2 = ObjectWithPrototype<
  BaseEngineProgram2,
  EngineProgram2Prototype
>;

export const { EngineProgram2Instance } = buildConstructorFunctionWithName(
  'EngineProgram2Instance',
)<BaseEngineProgram2, EngineProgram2Prototype>({
  zorn: getEngineProgramZorn,
  id: getZornableId,
  startingSubgraphId: (engineProgram) => {
    return getTextDigest(`start-subgraph | ${engineProgram.programName}`);
  },
  startingNodeId: (engineProgram) => {
    return getTextDigest(`start-node | ${engineProgram.programName}`);
  },
  endingSubgraphId: (engineProgram) => {
    return getTextDigest(`end-subgraph | ${engineProgram.programName}`);
  },
  endingNodeId: (engineProgram) => {
    return getTextDigest(`end-node | ${engineProgram.programName}`);
  },
});

export const ENGINE_PROGRAM_2_GEPP = 'engine-program-2';

type EngineProgram2Gepp = typeof ENGINE_PROGRAM_2_GEPP;

export type EngineProgram2Voque = InMemoryOdeshin2Voque<
  EngineProgram2Gepp,
  EngineProgram2
>;
