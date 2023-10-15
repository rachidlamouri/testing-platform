import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getTextDigest } from '../../../package-agnostic-utilities/string/getTextDigest';
import { getIdentifiableId } from '../../../layer-agnostic-utilities/deprecated-id/getIdentifiableId';
import { RootGraphLocator } from '../graph-visualization/directed-graph/rootGraphLocator';
import { TypeScriptFile } from '../type-script-file/typeScriptFile';
import { EngineStreamMetatypeLocator2 } from './engineStreamMetatypeLocator2';
import { getEngineProgramId } from './partialEngineProgramLocator2';
import { ProgramProgrammedTransformRelationship } from './programProgrammedTransformRelationship';

type BaseEngineProgramLocator3 = {
  isCoreProgram: boolean;
  programName: string;
  description: string;
  filePath: string;
  // TODO: show if a collection is manually instantiated, part of the uninferred
  // collection list, and if it is initialized
  initializedStreamMetatypeLocatorList: EngineStreamMetatypeLocator2[];
  programmedTransformRelationshipList: ProgramProgrammedTransformRelationship[];
  rootGraphLocator: RootGraphLocator;
  engineProgramFile: TypeScriptFile;
};

type EngineProgramLocator3Prototype = {
  get id(): string;
  get digestibleId(): string;
  get startingSubgraphId(): string;
  get startingNodeId(): string;
  get endingSubgraphId(): string;
  get endingNodeId(): string;
};

/**
 * The information needed to find the parts of an engine program so that it can
 * be assembled later into a complete model
 *
 * @readableName ProgramLocator
 */
export type EngineProgramLocator3 = ObjectWithPrototype<
  BaseEngineProgramLocator3,
  EngineProgramLocator3Prototype
>;

export const { EngineProgramLocator3Instance } =
  buildConstructorFunctionWithName('EngineProgramLocator3Instance')<
    BaseEngineProgramLocator3,
    EngineProgramLocator3Prototype
  >({
    id: getEngineProgramId,
    digestibleId: getIdentifiableId,
    startingSubgraphId: (locator) => {
      return getTextDigest(`start-subgraph | ${locator.programName}`);
    },
    startingNodeId: (locator) => {
      return getTextDigest(`start-node | ${locator.programName}`);
    },
    endingSubgraphId: (locator) => {
      return getTextDigest(`end-subgraph | ${locator.programName}`);
    },
    endingNodeId: (locator) => {
      return getTextDigest(`end-node | ${locator.programName}`);
    },
  });

export const ENGINE_PROGRAM_LOCATOR_3_COLLECTION_ID =
  'engine-program-locator-3';

type EngineProgramLocator3CollectionId =
  typeof ENGINE_PROGRAM_LOCATOR_3_COLLECTION_ID;

export type EngineProgramLocator3StreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    EngineProgramLocator3CollectionId,
    EngineProgramLocator3
  >;
