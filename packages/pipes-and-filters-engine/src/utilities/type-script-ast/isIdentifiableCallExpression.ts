import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { Identifier, isIdentifier } from './isIdentifier';
import { isNode, TypeScriptNode } from './isNode';

export type IdentifiableCallExpression<TName extends string = string> =
  TSESTree.CallExpression & {
    callee: Identifier<TName>;
  };

export const isIdentifiableCallExpression = (
  node: TypeScriptNode,
): node is IdentifiableCallExpression =>
  isNode(node) &&
  node.type === AST_NODE_TYPES.CallExpression &&
  isIdentifier(node.callee);
