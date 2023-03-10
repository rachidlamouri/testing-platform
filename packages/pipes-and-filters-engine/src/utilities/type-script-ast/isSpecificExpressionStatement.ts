import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';

export const isSpecificExpressionStatement = <
  TExpressionType extends TSESTree.Expression['type'],
>(
  node: TSESTree.Node,
  expressionType: TExpressionType,
): node is TSESTree.Expression & {
  expression: Extract<TSESTree.Expression, { type: TExpressionType }>;
} =>
  node.type === AST_NODE_TYPES.ExpressionStatement &&
  node.expression.type === expressionType;
