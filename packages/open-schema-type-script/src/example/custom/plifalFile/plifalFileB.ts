import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { Grition } from '../../../custom-adapter/grition';
import { Odeshin } from '../../../custom-adapter/odeshin';
import { Plifal } from '../../../custom-adapter/plifal';
import { buildOnamaHamletive } from '../../../type-script-adapter/hamletive/onama';
import {
  PlifalFileA,
  PlifalFileAPlifal,
  PLIFAL_FILE_A_GEPP,
} from './plifalFileA';

export type Identifier = {
  name: string;
  has: boolean;
};

export type IdentifierCollection = {
  baseType: Identifier;
  gritionType: Identifier;
  geppConstant: Identifier;
  geppType: Identifier;
  identifierType: Identifier;
  odeshinType: Identifier;
  plifalType: Identifier;
};

export type PlifalFileB = Omit<PlifalFileA, 'additionalMetadata'> & {
  additionalMetadata: {
    program: PlifalFileA['additionalMetadata']['program'];
    identifierCollection: {
      baseType: Identifier;
      gritionType: Identifier;
      geppConstant: Identifier;
      geppType: Identifier;
      identifierType: Identifier;
      odeshinType: Identifier;
      plifalType: Identifier;
    };
  };
};

export type PlifalFileBGrition = Grition<PlifalFileB>;

export type PlifalFileBIdentifier = `plifal-file-b:${string}`;

export type PlifalFileBOdeshin = Odeshin<
  PlifalFileBIdentifier,
  PlifalFileBGrition
>;

export const PLIFAL_FILE_B_GEPP = Symbol('plifal-file-b');

export type PlifalFileBGepp = typeof PLIFAL_FILE_B_GEPP;

export type PlifalFileBPlifal = Plifal<[PlifalFileBGepp], PlifalFileBOdeshin>;

type ProgramCache = Map<string, TSESTree.Node>;

type IdentifierTypeReference = TSESTree.TSTypeReference & {
  typeName: TSESTree.Identifier;
};

const isTypeReferenceIdentifier = (
  node: TSESTree.Node | undefined,
): node is IdentifierTypeReference =>
  node !== undefined &&
  node.type === AST_NODE_TYPES.TSTypeReference &&
  node.typeName.type === AST_NODE_TYPES.Identifier;

const isTypeReferenceIdentifierWithName = (
  node: TSESTree.Node | undefined,
  identifierName: string,
): node is IdentifierTypeReference =>
  isTypeReferenceIdentifier(node) && node.typeName.name === identifierName;

export const buildPlifalFileB = buildOnamaHamletive<
  PlifalFileAPlifal,
  PlifalFileBPlifal
>({
  inputGepp: PLIFAL_FILE_A_GEPP,
  ankel: (input) => {
    const { program } = input.hubblepup.grition.additionalMetadata;
    const programCache: ProgramCache = new Map();

    program.body.forEach((statement) => {
      if (
        statement.type === AST_NODE_TYPES.ExportNamedDeclaration &&
        statement.declaration !== null
      ) {
        if (
          statement.declaration.type === AST_NODE_TYPES.TSTypeAliasDeclaration
        ) {
          programCache.set(
            statement.declaration.id.name,
            statement.declaration.typeAnnotation,
          );
        }

        if (
          statement.declaration.type === AST_NODE_TYPES.VariableDeclaration &&
          statement.declaration.declarations[0] !== undefined &&
          statement.declaration.declarations[0].type ===
            AST_NODE_TYPES.VariableDeclarator &&
          statement.declaration.declarations[0].id.type ===
            AST_NODE_TYPES.Identifier &&
          statement.declaration.declarations[0].init !== null
        ) {
          programCache.set(
            statement.declaration.declarations[0].id.name,
            statement.declaration.declarations[0].init,
          );
        }
      }
    });

    const { inMemoryFileName } = input.hubblepup.grition;

    const baseType = ((): Identifier => {
      const typeName = inMemoryFileName.pascalCase;
      const node = programCache.get(typeName);
      const has = node !== undefined;

      return {
        name: typeName,
        has,
      };
    })();

    const gritionType = ((): Identifier => {
      const typeName = `${inMemoryFileName.pascalCase}Grition`;
      const node = programCache.get(typeName);
      const has =
        node !== undefined &&
        node.type === AST_NODE_TYPES.TSTypeReference &&
        node.typeName.type === AST_NODE_TYPES.Identifier &&
        node.typeName.name === 'Grition' &&
        node.typeParameters !== undefined &&
        node.typeParameters.type ===
          AST_NODE_TYPES.TSTypeParameterInstantiation &&
        isTypeReferenceIdentifierWithName(
          node.typeParameters.params[0],
          baseType.name,
        );

      return {
        name: typeName,
        has,
      };
    })();

    const geppConstant = ((): Identifier => {
      const constantName = `${inMemoryFileName.screamingSnakeCase}_GEPP`;
      const node = programCache.get(constantName);
      const has =
        node !== undefined &&
        node.type === AST_NODE_TYPES.CallExpression &&
        node.callee.type === AST_NODE_TYPES.Identifier &&
        node.callee.name === 'Symbol' &&
        node.arguments[0] !== undefined &&
        node.arguments[0].type === AST_NODE_TYPES.Literal &&
        node.arguments[0].value === inMemoryFileName.kebabCase;

      return {
        name: constantName,
        has,
      };
    })();

    const geppType = ((): Identifier => {
      const typeName = `${inMemoryFileName.pascalCase}Gepp`;
      const node = programCache.get(typeName);
      const has =
        node !== undefined &&
        node.type === AST_NODE_TYPES.TSTypeQuery &&
        node.exprName.type === AST_NODE_TYPES.Identifier &&
        node.exprName.name === geppConstant.name;

      return {
        name: typeName,
        has,
      };
    })();

    const identifierType = ((): Identifier => {
      const typeName = `${inMemoryFileName.pascalCase}Identifier`;
      const node = programCache.get(typeName);
      const has =
        node !== undefined &&
        node.type === AST_NODE_TYPES.TSTemplateLiteralType &&
        node.quasis[0] !== undefined &&
        node.quasis[0].value.cooked === `${inMemoryFileName.kebabCase}:` &&
        node.quasis[1] !== undefined &&
        node.quasis[1].value.cooked === '' &&
        node.types[0] !== undefined &&
        node.types[0].type === AST_NODE_TYPES.TSStringKeyword;

      return {
        name: typeName,
        has,
      };
    })();

    const odeshinType = ((): Identifier => {
      const typeName = `${inMemoryFileName.pascalCase}Odeshin`;
      const node = programCache.get(typeName);
      const has =
        node !== undefined &&
        node.type === AST_NODE_TYPES.TSTypeReference &&
        node.typeName.type === AST_NODE_TYPES.Identifier &&
        node.typeName.name === 'Odeshin' &&
        node.typeParameters !== undefined &&
        node.typeParameters.type ===
          AST_NODE_TYPES.TSTypeParameterInstantiation &&
        isTypeReferenceIdentifierWithName(
          node.typeParameters.params[0],
          identifierType.name,
        ) &&
        isTypeReferenceIdentifierWithName(
          node.typeParameters.params[1],
          gritionType.name,
        );

      return {
        name: typeName,
        has,
      };
    })();

    const plifalType = ((): Identifier => {
      const typeName = `${inMemoryFileName.pascalCase}Plifal`;
      const node = programCache.get(typeName);
      const has =
        node !== undefined &&
        node.type === AST_NODE_TYPES.TSTypeReference &&
        node.typeName.type === AST_NODE_TYPES.Identifier &&
        node.typeName.name === 'Plifal' &&
        node.typeParameters !== undefined &&
        node.typeParameters.type ===
          AST_NODE_TYPES.TSTypeParameterInstantiation &&
        node.typeParameters.params[0] !== undefined &&
        node.typeParameters.params[0].type === AST_NODE_TYPES.TSTupleType &&
        isTypeReferenceIdentifierWithName(
          node.typeParameters.params[0].elementTypes[0],
          geppType.name,
        ) &&
        isTypeReferenceIdentifierWithName(
          node.typeParameters.params[1],
          odeshinType.name,
        );

      return {
        name: typeName,
        has,
      };
    })();

    const output: PlifalFileBPlifal = {
      geppTuple: [PLIFAL_FILE_B_GEPP],
      hubblepup: {
        identifier: `plifal-file-b:${input.hubblepup.grition.filePath}`,
        grition: {
          ...input.hubblepup.grition,
          additionalMetadata: {
            program,
            identifierCollection: {
              baseType,
              gritionType,
              geppConstant,
              geppType,
              identifierType,
              odeshinType,
              plifalType,
            },
          },
        },
      },
    };

    return output;
  },
});
