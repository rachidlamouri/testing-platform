import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';

export type IdentifiableProperty = TSESTree.Property & {
  key: TSESTree.Identifier;
};

export type ObjectExpressionWithIdentifierProperties =
  TSESTree.ObjectExpression & {
    properties: IdentifiableProperty[];
  };

export const isIdentifiableProperty = (
  node: TSESTree.Node,
): node is IdentifiableProperty =>
  node.type === AST_NODE_TYPES.Property &&
  node.key.type === AST_NODE_TYPES.Identifier;

export const isObjectExpressionWithIdentifierProperties = (
  node: TSESTree.Node,
): node is ObjectExpressionWithIdentifierProperties =>
  node.type === AST_NODE_TYPES.ObjectExpression &&
  node.properties.every(isIdentifiableProperty);
