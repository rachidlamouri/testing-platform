import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';

export type IdentifiableVariableDeclarator = TSESTree.VariableDeclarator & {
  id: TSESTree.Identifier;
};

export type IdentifiableVariableDeclaration = TSESTree.VariableDeclaration & {
  declarations: [IdentifiableVariableDeclarator];
};

export const isIdentifiableVariableDeclaration = (
  node: TSESTree.Node,
): node is IdentifiableVariableDeclaration =>
  node.type === AST_NODE_TYPES.VariableDeclaration &&
  node.declarations[0] !== undefined &&
  node.declarations[0].id.type === AST_NODE_TYPES.Identifier;
