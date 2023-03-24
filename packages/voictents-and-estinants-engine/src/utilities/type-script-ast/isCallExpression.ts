import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { isSpecificIdentifier } from './isIdentifier';
import { isNode, TypeScriptNode } from './isNode';

export const isCallExpression = (
  node: TypeScriptNode,
): node is TSESTree.CallExpression =>
  isNode(node) && node.type === AST_NODE_TYPES.CallExpression;

export const isSpecificIdentifiableCallExpression = (
  node: TypeScriptNode,
  identifierName: string,
): node is TSESTree.CallExpression =>
  isCallExpression(node) && isSpecificIdentifier(node.callee, identifierName);
