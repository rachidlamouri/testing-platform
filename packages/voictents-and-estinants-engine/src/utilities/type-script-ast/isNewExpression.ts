import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { TypeScriptNode } from './isNode';
import {
  ObjectExpressionWithIdentifierProperties,
  isObjectExpressionWithIdentifierProperties,
} from './isObjectLiteralExpressionWithIdentifierProperties';

export const isNewExpression = (
  node: TypeScriptNode,
): node is TSESTree.NewExpression =>
  node?.type === AST_NODE_TYPES.NewExpression;

export type NewExpressionWithObjectExpressionArgument =
  TSESTree.NewExpression & {
    arguments: [ObjectExpressionWithIdentifierProperties];
  };

export const isNewExpressionWithObjectExpressionArgument = (
  node: TypeScriptNode,
): node is NewExpressionWithObjectExpressionArgument => {
  return (
    isNewExpression(node) &&
    isObjectExpressionWithIdentifierProperties(node.arguments[0])
  );
};
