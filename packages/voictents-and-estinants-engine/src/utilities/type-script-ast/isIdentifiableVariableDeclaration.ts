import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { TypeScriptNode, isNode } from './isNode';

export type IdentifiableVariableDeclarator = TSESTree.VariableDeclarator & {
  id: TSESTree.Identifier;
};

export type IdentifiableVariableDeclaration = TSESTree.VariableDeclaration & {
  declarations: [IdentifiableVariableDeclarator];
};

export const isIdentifiableVariableDeclaration = (
  node: TypeScriptNode,
): node is IdentifiableVariableDeclaration =>
  isNode(node) &&
  node.type === AST_NODE_TYPES.VariableDeclaration &&
  node.declarations[0] !== undefined &&
  node.declarations[0].id.type === AST_NODE_TYPES.Identifier;
