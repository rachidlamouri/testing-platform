import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { isNode, TypeScriptNode } from './isNode';

export type Identifier<TName extends string = string> = TSESTree.Identifier & {
  name: TName;
};

export const isIdentifier = (
  node: TypeScriptNode,
): node is TSESTree.Identifier =>
  isNode(node) && node.type === AST_NODE_TYPES.Identifier;

export const isSpecificIdentifier = <TName extends string>(
  node: TSESTree.Node,
  identifierName: TName,
): node is Identifier<TName> =>
  isIdentifier(node) && node.name === identifierName;
