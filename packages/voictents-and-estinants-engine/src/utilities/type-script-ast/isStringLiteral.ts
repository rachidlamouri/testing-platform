import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';

export const isStringLiteral = (
  node: TSESTree.Node,
): node is TSESTree.StringLiteral =>
  node.type === AST_NODE_TYPES.Literal && typeof node.value === 'string';
