import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { RootGraphLocator } from '../../graph-visualization/directed-graph/rootGraphLocator';
import { RootDirectedGraphElement2Zorn } from '../../graph-visualization/directed-graph/types';
import { EngineEstinantLocator2 } from '../engineEstinantLocator2';
import {
  EngineEstinantInput2Zorn,
  EngineEstinantInput2,
} from './engineEstinantInput2';

const PROGRAM_ESTINANT_INPUT_RELATIONSHIP_ZORN_TEMPLATE = [
  ['rootGraphLocator', RootDirectedGraphElement2Zorn],
  ['estinantInput', EngineEstinantInput2Zorn],
] as const satisfies GenericComplexIdTemplate;
type ProgramEstinantInputRelationshipZornTemplate =
  typeof PROGRAM_ESTINANT_INPUT_RELATIONSHIP_ZORN_TEMPLATE;
class ProgramEstinantInputRelationshipZorn extends ComplexId<ProgramEstinantInputRelationshipZornTemplate> {
  get rawTemplate(): ProgramEstinantInputRelationshipZornTemplate {
    return PROGRAM_ESTINANT_INPUT_RELATIONSHIP_ZORN_TEMPLATE;
  }
}

type BaseProgramEstinantInputRelationship = {
  estinantInput: EngineEstinantInput2;
  rootGraphLocator: RootGraphLocator;
  estinantLocator: EngineEstinantLocator2;
};

type ProgramEstinantInputRelationshipPrototype = {
  get zorn(): ProgramEstinantInputRelationshipZorn;
};

/**
 * Defines a relationship between a program and a transform input
 *
 * @readableName ProgramTransformInputStreamRelationship
 */
type ProgramEstinantInputRelationship = ObjectWithPrototype<
  BaseProgramEstinantInputRelationship,
  ProgramEstinantInputRelationshipPrototype
>;

export const { ProgramEstinantInputRelationshipInstance } =
  buildConstructorFunctionWithName('ProgramEstinantInputRelationshipInstance')<
    BaseProgramEstinantInputRelationship,
    ProgramEstinantInputRelationshipPrototype
  >({
    zorn: (relationship) => {
      return new ProgramEstinantInputRelationshipZorn({
        rootGraphLocator: relationship.rootGraphLocator.zorn,
        estinantInput: relationship.estinantInput.zorn,
      });
    },
  });

export const PROGRAM_ESTINANT_INPUT_RELATIONSHIP_GEPP =
  'program-estinant-input-relationship';

type ProgramEstinantInputRelationshipGepp =
  typeof PROGRAM_ESTINANT_INPUT_RELATIONSHIP_GEPP;

export type ProgramEstinantInputRelationshipVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    ProgramEstinantInputRelationshipGepp,
    ProgramEstinantInputRelationship
  >;
