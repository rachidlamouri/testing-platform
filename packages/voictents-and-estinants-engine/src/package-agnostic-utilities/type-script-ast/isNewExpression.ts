import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { TypeScriptNode, isNode } from './isNode';
import {
  ObjectExpressionWithIdentifierProperties,
  isObjectExpressionWithIdentifierProperties,
} from './isObjectLiteralExpressionWithIdentifierProperties';
import {
  TypeScriptTypeParameterInstantiationWithSpecificParameterTuple,
  TypeScriptTypeParameterNodeTypeTuple,
  isTypeScriptTypeParameterInstantiationWithParameterTuple,
} from './isTypeScriptTypeParameterInstantiation';

export const isNewExpression = (
  node: TypeScriptNode,
): node is TSESTree.NewExpression =>
  node?.type === AST_NODE_TYPES.NewExpression;

type NewExpressionWithObjectExpressionArgument = TSESTree.NewExpression & {
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

type NewExpressionWithSpecificTypeParameters<
  TTypeScriptTypeParameterNodeTypeTuple extends TypeScriptTypeParameterNodeTypeTuple = TypeScriptTypeParameterNodeTypeTuple,
> = TSESTree.NewExpression & {
  typeParameters: TypeScriptTypeParameterInstantiationWithSpecificParameterTuple<TTypeScriptTypeParameterNodeTypeTuple>;
};

export const isNewExpressionWithSpecificTypeParameters = <
  TTypeScriptTypeParameterNodeTypeTuple extends TypeScriptTypeParameterNodeTypeTuple,
>(
  node: TypeScriptNode,
  parameterNodeTypeTuple: TTypeScriptTypeParameterNodeTypeTuple,
): node is NewExpressionWithSpecificTypeParameters<TTypeScriptTypeParameterNodeTypeTuple> =>
  isNode(node) &&
  isNewExpression(node) &&
  isTypeScriptTypeParameterInstantiationWithParameterTuple(
    node.typeParameters,
    parameterNodeTypeTuple,
  );
