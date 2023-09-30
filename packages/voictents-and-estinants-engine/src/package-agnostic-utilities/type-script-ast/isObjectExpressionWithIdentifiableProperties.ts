import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { TypeScriptNode, isNode } from './isNode';

export type IdentifiableProperty = TSESTree.Property & {
  key: TSESTree.Identifier;
};

export type ObjectExpressionWithIdentifierProperties =
  TSESTree.ObjectExpression & {
    properties: IdentifiableProperty[];
  };

const isIdentifiableProperty = (
  node: TSESTree.Node,
): node is IdentifiableProperty =>
  node.type === AST_NODE_TYPES.Property &&
  node.key.type === AST_NODE_TYPES.Identifier;

export const isSepcificIdentifiableProperty = (
  node: TSESTree.Node,
  identifierName: string,
): node is IdentifiableProperty => {
  return isIdentifiableProperty(node) && node.key.name === identifierName;
};

export const isObjectExpressionWithIdentifiableProperties = (
  node: TypeScriptNode,
): node is ObjectExpressionWithIdentifierProperties =>
  isNode(node) &&
  node.type === AST_NODE_TYPES.ObjectExpression &&
  node.properties.every(isIdentifiableProperty);
