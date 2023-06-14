// import { RootGraphLocator } from "../graph-visualization/directed-graph/rootGraphLocator";

// export type BaseEstinantInputProgramRelationship = {
//   rootGraphLocator: RootGraphLocator;
//   estinantInputLocator: EngineEstinantInputLoc;
// };

// export type EstinantInputProgramRelationshipPrototype = {
//   get zorn(): string;
// };

// /**
//  * Contains the locators for an estinant and a graph that references that estinant
//  */
// export type EstinantInputProgramRelationship = ObjectWithPrototype<
//   EstinantInputProgramRelationship,
//   BaseEstinantInputProgramRelationship
// >;

// export const { EstinantInputProgramRelationshipInstance } =
//   buildConstructorFunctionWithName('EstinantInputProgramRelationshipInstance')<
//     EstinantInputProgramRelationship,
//     BaseEstinantInputProgramRelationship
//   >({
//     zorn: (relationship) => {
//       return getZorn([
//         relationship.rootGraphLocator.id,
//         relationship.engineEstinantLocator.id,
//       ]);
//     },
//   });

// export const ESTINANT_INPUT_PROGRAM_RELATIONSHIP_GEPP =
//   'estinant-input-program-relationship';

// export type EstinantInputProgramRelationshipGepp =
//   typeof ESTINANT_INPUT_PROGRAM_RELATIONSHIP_GEPP;

// export type EstinantInputProgramRelationshipVoque = InMemoryOdeshin2Voque<
//   EstinantInputProgramRelationshipGepp,
//   EstinantInputProgramRelationship
// >;
