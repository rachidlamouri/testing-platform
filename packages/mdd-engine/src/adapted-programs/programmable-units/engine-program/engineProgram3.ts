import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getIdentifiableId } from '../../../layer-agnostic-utilities/deprecated-id/getIdentifiableId';
import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { RootGraphLocator } from '../graph-visualization/directed-graph/rootGraphLocator';
import { EngineProgrammedTransform3 } from './engineProgrammedTransform3';
import { EngineProgramLocator3 } from './engineProgramLocator3';
import { EngineStreamMetatypeLocator2 } from './engineStreamMetatypeLocator2';
import { getEngineProgramId } from './partialEngineProgramLocator2';

type BaseEngineProgram3 = {
  programName: string;
  description: string;
  filePath: string;
  programmedTransformList: Tuple<EngineProgrammedTransform3>;
  initializedStreamMetatypeLocatorList: EngineStreamMetatypeLocator2[];
  endingStreamMetatypeLocatorList: EngineStreamMetatypeLocator2[];
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
  id: getEngineProgramId,
  digestibleId: getIdentifiableId,
  rootGraphLocator: (engineProgram) => {
    return engineProgram.locator.rootGraphLocator;
  },
});

export const ENGINE_PROGRAM_3_COLLECTION_ID = 'engine-program-3';

type EngineProgram3CollectionId = typeof ENGINE_PROGRAM_3_COLLECTION_ID;

export type EngineProgram3StreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    EngineProgram3CollectionId,
    EngineProgram3
  >;
