import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { TypeScriptNode, isNode } from './isNode';
import { isIdentifier } from './isIdentifier';

export type IdentifiableFunctionDeclaration = TSESTree.FunctionDeclaration & {
  id: TSESTree.Identifier;
};

export const isIdentifiableFunctionDeclaration = (
  node: TypeScriptNode,
): node is IdentifiableFunctionDeclaration =>
  isNode(node) &&
  node.type === AST_NODE_TYPES.FunctionDeclaration &&
  isIdentifier(node.id);
