import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import {
  isNamedClassDeclaration,
  NamedClassDeclaration,
} from './isNamedClassDeclaration';
import { isNode, TypeScriptNode } from './isNode';

export type IdentifiableTypeDeclaration =
  | TSESTree.TSTypeAliasDeclaration
  | NamedClassDeclaration;

export const isIdentifiableTypeDeclaration = (
  node: TypeScriptNode,
): node is IdentifiableTypeDeclaration =>
  isNode(node) &&
  (node.type === AST_NODE_TYPES.TSTypeAliasDeclaration ||
    isNamedClassDeclaration(node));
