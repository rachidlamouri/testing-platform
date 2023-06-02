import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { Tuple } from '../semantic-types/tuple';
import { isNode, TypeScriptNode } from './isNode';

type TypeScriptTypeParameterNodeList =
  TSESTree.TSTypeParameterInstantiation['params'];

type TypeScriptTypeParameterNode = TypeScriptTypeParameterNodeList[number];

export type TypeScriptTypeParameterNodeTuple =
  Tuple<TypeScriptTypeParameterNode>;

export type TypeScriptTypeParameterNodeTypeTuple = Tuple<
  TypeScriptTypeParameterNode['type']
>;

export type TypeScriptTypeParameterInstantiation<
  TTypeScriptTypeParameterNodeTuple extends TypeScriptTypeParameterNodeTuple = TypeScriptTypeParameterNodeTuple,
> = Omit<TSESTree.TSTypeParameterInstantiation, 'params'> & {
  params: TTypeScriptTypeParameterNodeTuple;
};

export const isTypeScriptTypeParameterInstantiation = (
  node: TypeScriptNode,
): node is TSESTree.TSTypeParameterInstantiation =>
  isNode(node) && node.type === AST_NODE_TYPES.TSTypeParameterInstantiation;

export type TypeScriptTypeParameterInstantiationWithSpecificParameterTuple<
  TTypeScriptTypeParameterNodeTypeTuple extends TypeScriptTypeParameterNodeTypeTuple,
> = TSESTree.TSTypeParameterInstantiation & {
  params: {
    [Index in keyof TTypeScriptTypeParameterNodeTypeTuple]: Extract<
      TSESTree.TypeNode,
      { type: TTypeScriptTypeParameterNodeTypeTuple[Index] }
    >;
  };
};

export const isTypeScriptTypeParameterInstantiationWithParameterTuple = <
  TTypeScriptTypeParameterNodeTypeTuple extends TypeScriptTypeParameterNodeTypeTuple,
>(
  node: TypeScriptNode,
  parameterNodeTypeTuple: TTypeScriptTypeParameterNodeTypeTuple,
): node is TypeScriptTypeParameterInstantiationWithSpecificParameterTuple<TTypeScriptTypeParameterNodeTypeTuple> =>
  isNode(node) &&
  node.type === AST_NODE_TYPES.TSTypeParameterInstantiation &&
  node.params.every(
    (subNode, index) =>
      parameterNodeTypeTuple[index] === undefined ||
      subNode.type === parameterNodeTypeTuple[index],
  );

type TypeScriptTypeParameterInstantiationWithSpecificParameterTuplePredicate<
  TTypeScriptTypeParameterNodeTypeTuple extends TypeScriptTypeParameterNodeTypeTuple,
> = (
  node: TypeScriptNode,
) => node is TypeScriptTypeParameterInstantiationWithSpecificParameterTuple<TTypeScriptTypeParameterNodeTypeTuple>;

export const buildIsTypeScriptTypeParameterInstantiationWithSpecificParameterTuple =
  <
    TTypeScriptTypeParameterNodeTypeTuple extends TypeScriptTypeParameterNodeTypeTuple,
  >(
    parameterNodeTypeTuple: TTypeScriptTypeParameterNodeTypeTuple,
  ): TypeScriptTypeParameterInstantiationWithSpecificParameterTuplePredicate<TTypeScriptTypeParameterNodeTypeTuple> => {
    const isTypeScriptTypeParameterInstantiationWithSpecificParameterTuple = (
      node: TypeScriptNode,
    ): node is TypeScriptTypeParameterInstantiationWithSpecificParameterTuple<TTypeScriptTypeParameterNodeTypeTuple> => {
      return isTypeScriptTypeParameterInstantiationWithParameterTuple(
        node,
        parameterNodeTypeTuple,
      );
    };

    return isTypeScriptTypeParameterInstantiationWithSpecificParameterTuple;
  };
