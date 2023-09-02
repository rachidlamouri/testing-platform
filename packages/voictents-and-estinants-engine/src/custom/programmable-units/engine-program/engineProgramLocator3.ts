import { InMemoryOdeshin2ListVoque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { getTextDigest } from '../../../utilities/getTextDigest';
import { getZornableId } from '../../../utilities/getZornableId';
import { RootGraphLocator } from '../graph-visualization/directed-graph/rootGraphLocator';
import { EngineVoqueLocator2 } from './engineVoqueLocator2';
import { getEngineProgramZorn } from './partialEngineProgramLocator2';
import { ProgramEstinantRelationship } from './programEstinantRelationship';

type BaseEngineProgramLocator3 = {
  isCoreProgram: boolean;
  programName: string;
  description: string;
  filePath: string;
  // TODO: show if a collection is manually instantiated, part of the uninferred
  // collection list, and if it is initialized
  initializedVoqueLocatorList: EngineVoqueLocator2[];
  estinantRelationshipList: ProgramEstinantRelationship[];
  rootGraphLocator: RootGraphLocator;
};

type EngineProgramLocator3Prototype = {
  get zorn(): string;
  get id(): string;
  get startingSubgraphId(): string;
  get startingNodeId(): string;
  get endingSubgraphId(): string;
  get endingNodeId(): string;
};

/**
 * The information needed to find the parts of an engine program so that it can
 * be assembled later into a complete model
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
    zorn: getEngineProgramZorn,
    id: getZornableId,
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

export const ENGINE_PROGRAM_LOCATOR_3_GEPP = 'engine-program-locator-3';

type EngineProgramLocator3Gepp = typeof ENGINE_PROGRAM_LOCATOR_3_GEPP;

export type EngineProgramLocator3Voque = InMemoryOdeshin2ListVoque<
  EngineProgramLocator3Gepp,
  EngineProgramLocator3
>;
