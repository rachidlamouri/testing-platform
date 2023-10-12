import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getIdentifiableId } from '../../../layer-agnostic-utilities/deprecated-id/getIdentifiableId';
import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
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
};

type EngineProgram3Prototype = {
  get id(): string;
  get digestibleId(): string;
  get rootGraphLocator(): RootGraphLocator;
};

/**
 * The model of a program
 *
 * @readableName ProgramModel
 */
type EngineProgram3 = ObjectWithPrototype<
  BaseEngineProgram3,
  EngineProgram3Prototype
>;

export const { EngineProgram3Instance } = buildConstructorFunctionWithName(
  'EngineProgram3Instance',
)<BaseEngineProgram3, EngineProgram3Prototype>({
  id: getEngineProgramZorn,
  digestibleId: getIdentifiableId,
  rootGraphLocator: (engineProgram) => {
    return engineProgram.locator.rootGraphLocator;
  },
});

export const ENGINE_PROGRAM_3_GEPP = 'engine-program-3';

type EngineProgram3Gepp = typeof ENGINE_PROGRAM_3_GEPP;

export type EngineProgram3Voque = InMemoryIdentifiableItem2ListStreamMetatype<
  EngineProgram3Gepp,
  EngineProgram3
>;
