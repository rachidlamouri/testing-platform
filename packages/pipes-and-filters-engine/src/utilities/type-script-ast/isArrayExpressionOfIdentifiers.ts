import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { isIdentifier } from './isIdentifier';
import { isNode, TypeScriptNode } from './isNode';

export type ArrayExpressionOfIdentifiers = TSESTree.ArrayExpression & {
  elements: TSESTree.Identifier[];
};

export const isArrayExpressionOfIdentifiers = (
  node: TypeScriptNode,
): node is ArrayExpressionOfIdentifiers =>
  isNode(node) &&
  node.type === AST_NODE_TYPES.ArrayExpression &&
  node.elements.every(isIdentifier);
