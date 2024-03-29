import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { TypeScriptNode, isNode } from './isNode';

export type ArrayExpressionElement =
  TSESTree.ArrayExpression['elements'][number];

export const isArrayExpression = (
  node: TypeScriptNode,
): node is TSESTree.ArrayExpression => {
  return isNode(node) && node.type === AST_NODE_TYPES.ArrayExpression;
};
