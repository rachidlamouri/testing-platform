import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';

export const isImportDeclaration = (
  node: TSESTree.Node,
): node is TSESTree.ImportDeclaration =>
  node.type === AST_NODE_TYPES.ImportDeclaration;
