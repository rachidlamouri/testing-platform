import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getId } from '../../../../layer-agnostic-utilities/deprecated-id/getId';
import { RootGraphLocator } from '../../graph-visualization/directed-graph/rootGraphLocator';
import { EngineEstinantLocator2 } from '../engineEstinantLocator2';

type BaseProgramEstinantOutputRelationship = {
  outputZorn: string;
  estinantLocator: EngineEstinantLocator2;
  rootGraphLocator: RootGraphLocator;
};

type ProgramEstinantOutputRelationshipPrototype = {
  get zorn(): string;
};

/**
 * Defines a relationship between a program and a transform output
 *
 * @readableName ProgramTransformOutputStreamRelationship
 */
type ProgramEstinantOutputRelationship = ObjectWithPrototype<
  BaseProgramEstinantOutputRelationship,
  ProgramEstinantOutputRelationshipPrototype
>;

export const { ProgramEstinantOutputRelationshipInstance } =
  buildConstructorFunctionWithName('ProgramEstinantOutputRelationshipInstance')<
    BaseProgramEstinantOutputRelationship,
    ProgramEstinantOutputRelationshipPrototype
  >({
    zorn: (relationship) => {
      return getId([
        relationship.rootGraphLocator.zorn.forHuman,
        relationship.outputZorn,
      ]);
    },
  });

export const PROGRAM_ESTINANT_OUTPUT_RELATIONSHIP_GEPP =
  'program-estinant-output-relationship';

type ProgramEstinantOutputRelationshipGepp =
  typeof PROGRAM_ESTINANT_OUTPUT_RELATIONSHIP_GEPP;

export type ProgramEstinantOutputRelationshipVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    ProgramEstinantOutputRelationshipGepp,
    ProgramEstinantOutputRelationship
  >;
