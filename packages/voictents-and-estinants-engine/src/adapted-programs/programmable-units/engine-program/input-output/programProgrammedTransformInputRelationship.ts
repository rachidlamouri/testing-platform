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
import { RootDirectedGraphElement2Id } from '../../graph-visualization/directed-graph/types';
import { EngineProgrammedTransformLocator2 } from '../engineEstinantLocator2';
import {
  EngineProgrammedTransformInput2Id,
  EngineProgrammedTransformInput2,
} from './engineProgrammedTransformInput2';

const PROGRAM_PROGRAMMED_TRANSFORM_INPUT_RELATIONSHIP_ID_TEMPLATE = [
  ['rootGraphLocator', RootDirectedGraphElement2Id],
  ['programmedTransformInput', EngineProgrammedTransformInput2Id],
] as const satisfies GenericComplexIdTemplate;
type ProgramProgrammedTransformInputRelationshipIdTemplate =
  typeof PROGRAM_PROGRAMMED_TRANSFORM_INPUT_RELATIONSHIP_ID_TEMPLATE;
class ProgramProgrammedTransformInputRelationshipId extends ComplexId<ProgramProgrammedTransformInputRelationshipIdTemplate> {
  get rawTemplate(): ProgramProgrammedTransformInputRelationshipIdTemplate {
    return PROGRAM_PROGRAMMED_TRANSFORM_INPUT_RELATIONSHIP_ID_TEMPLATE;
  }
}

type BaseProgramProgrammedTransformInputRelationship = {
  programmedTransformInput: EngineProgrammedTransformInput2;
  rootGraphLocator: RootGraphLocator;
  programmedTransformLocator: EngineProgrammedTransformLocator2;
};

type ProgramProgrammedTransformInputRelationshipPrototype = {
  get id(): ProgramProgrammedTransformInputRelationshipId;
};

/**
 * Defines a relationship between a program and a transform input
 *
 * @readableName ProgramTransformInputStreamRelationship
 */
type ProgramProgrammedTransformInputRelationship = ObjectWithPrototype<
  BaseProgramProgrammedTransformInputRelationship,
  ProgramProgrammedTransformInputRelationshipPrototype
>;

export const { ProgramProgrammedTransformInputRelationshipInstance } =
  buildConstructorFunctionWithName('ProgramEstinantInputRelationshipInstance')<
    BaseProgramProgrammedTransformInputRelationship,
    ProgramProgrammedTransformInputRelationshipPrototype
  >({
    id: (relationship) => {
      return new ProgramProgrammedTransformInputRelationshipId({
        rootGraphLocator: relationship.rootGraphLocator.id,
        programmedTransformInput: relationship.programmedTransformInput.id,
      });
    },
  });

export const PROGRAM_PROGRAMMED_TRANSFORM_INPUT_RELATIONSHIP_COLLECTION_ID =
  'program-estinant-input-relationship';

type ProgramProgrammedTransformInputRelationshipCollectionId =
  typeof PROGRAM_PROGRAMMED_TRANSFORM_INPUT_RELATIONSHIP_COLLECTION_ID;

export type ProgramProgrammedTransformInputRelationshipStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    ProgramProgrammedTransformInputRelationshipCollectionId,
    ProgramProgrammedTransformInputRelationship
  >;
