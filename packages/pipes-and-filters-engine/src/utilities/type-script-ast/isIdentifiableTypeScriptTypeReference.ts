import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { Identifier, isIdentifier } from './isIdentifier';

export type IdentifiableTypeScriptTypeReference<TName extends string = string> =
  TSESTree.TSTypeReference & {
    typeName: Identifier<TName>;
  };

export const isIdentifiableTypeScriptTypeReference = (
  node: TSESTree.Node,
): node is IdentifiableTypeScriptTypeReference =>
  node.type === AST_NODE_TYPES.TSTypeReference && isIdentifier(node.typeName);

export const isSpecificIdentifiableTypeScriptTypeReference = <
  TName extends string,
>(
  node: TSESTree.Node,
  typeName: TName,
): node is IdentifiableTypeScriptTypeReference =>
  isIdentifiableTypeScriptTypeReference(node) &&
  node.typeName.name === typeName;
