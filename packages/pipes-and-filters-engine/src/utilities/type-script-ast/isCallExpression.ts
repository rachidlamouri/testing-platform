import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { isSpecificIdentifier } from './isIdentifier';

export const isCallExpression = (
  node: TSESTree.Node,
): node is TSESTree.CallExpression =>
  node.type === AST_NODE_TYPES.CallExpression;

export const isSpecificCallExpression = (
  node: TSESTree.Node,
  identifierName: string,
): node is TSESTree.CallExpression =>
  isCallExpression(node) && isSpecificIdentifier(node.callee, identifierName);
