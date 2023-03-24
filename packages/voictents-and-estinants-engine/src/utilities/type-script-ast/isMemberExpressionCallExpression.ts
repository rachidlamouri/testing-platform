import { TSESTree } from '@typescript-eslint/typescript-estree';
import { isCallExpression } from './isCallExpression';
import { isIdentifier } from './isIdentifier';
import { isMemberExpression } from './isMemberExpression';
import { isNode, TypeScriptNode } from './isNode';

export type MemberExpressionCallExpression = TSESTree.MemberExpression & {
  object: TSESTree.CallExpression;
};

export const isMemberExpressionCallExpression = (
  node: TypeScriptNode,
): node is MemberExpressionCallExpression =>
  isNode(node) && isMemberExpression(node) && isCallExpression(node.object);

export type IdentifiableMemberExpressionCallExpression =
  MemberExpressionCallExpression & {
    property: TSESTree.Identifier;
  };

export const isIdentifiableMemberExpressionCallExpression = (
  node: TypeScriptNode,
): node is IdentifiableMemberExpressionCallExpression =>
  isMemberExpressionCallExpression(node) && isIdentifier(node.property);
