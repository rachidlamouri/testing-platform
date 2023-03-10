import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';

export const isTypeScriptTupleType = (
  node: TSESTree.Node,
): node is TSESTree.TSTupleType => node.type === AST_NODE_TYPES.TSTupleType;
