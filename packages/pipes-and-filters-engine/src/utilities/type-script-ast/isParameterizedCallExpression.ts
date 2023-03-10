import { TSESTree } from '@typescript-eslint/typescript-estree';
import { isCallExpression } from './isCallExpression';
import { isNode, TypeScriptNode } from './isNode';
import {
  isTypeScriptTypeParameterInstantiation,
  TypeScriptTypeParameterInstantiation,
  TypeScriptTypeParameterNodeTuple,
} from './isTypeScriptTypeParameterInstantiation';

export type ParameterizedCallExpression<
  TTypeScriptTypeParameterNodeTuple extends TypeScriptTypeParameterNodeTuple = TypeScriptTypeParameterNodeTuple,
> = TSESTree.CallExpression & {
  typeParameters: TypeScriptTypeParameterInstantiation<TTypeScriptTypeParameterNodeTuple>;
};

export const isParameterizedCallExpression = (
  node: TypeScriptNode,
): node is ParameterizedCallExpression =>
  isNode(node) &&
  isCallExpression(node) &&
  isTypeScriptTypeParameterInstantiation(node.typeParameters);
