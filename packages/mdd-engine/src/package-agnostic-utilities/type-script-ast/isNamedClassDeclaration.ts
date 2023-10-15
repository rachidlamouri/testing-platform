import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';

export type NamedClassDeclaration = TSESTree.ClassDeclaration & {
  id: TSESTree.Identifier;
};

export const isNamedClassDeclaration = (
  node: TSESTree.Node,
): node is NamedClassDeclaration =>
  node.type === AST_NODE_TYPES.ClassDeclaration && node.id !== null;
