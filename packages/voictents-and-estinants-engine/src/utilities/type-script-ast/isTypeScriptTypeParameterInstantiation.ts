import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { Tuple } from '../semantic-types/tuple';
import { isNode, TypeScriptNode } from './isNode';

export type TypeScriptTypeParameterNodeList =
  TSESTree.TSTypeParameterInstantiation['params'];

export type TypeScriptTypeParameterNode =
  TypeScriptTypeParameterNodeList[number];

export type TypeScriptTypeParameterNodeTuple =
  Tuple<TypeScriptTypeParameterNode>;

export type TypeScriptTypeParameterNodeTypeTuple = Tuple<
  TypeScriptTypeParameterNode['type']
>;

export type TypeScriptTypeParameterNodeTupleToTypeScriptTypeParameterNodeTypeTuple<
  TTypeScriptTypeParameterNodeTuple extends TypeScriptTypeParameterNodeTuple,
> = {
  [Index in keyof TTypeScriptTypeParameterNodeTuple]: TTypeScriptTypeParameterNodeTuple[Index]['type'];
};

export type TypeScriptTypeParameterInstantiation<
  TTypeScriptTypeParameterNodeTuple extends TypeScriptTypeParameterNodeTuple = TypeScriptTypeParameterNodeTuple,
> = Omit<TSESTree.TSTypeParameterInstantiation, 'params'> & {
  params: TTypeScriptTypeParameterNodeTuple;
};

export const isTypeScriptTypeParameterInstantiation = (
  node: TypeScriptNode,
): node is TSESTree.TSTypeParameterInstantiation =>
  isNode(node) && node.type === AST_NODE_TYPES.TSTypeParameterInstantiation;

export const isTypeScriptTypeParameterInstantiationWithParameterTuple = <
  TTypeScriptTypeParameterNodeTypeTuple extends TypeScriptTypeParameterNodeTypeTuple,
>(
  node: TypeScriptNode,
  parameterNodeTypeTuple: TTypeScriptTypeParameterNodeTypeTuple,
): node is TSESTree.TSTypeParameterInstantiation & {
  params: {
    [Index in keyof TTypeScriptTypeParameterNodeTypeTuple]: Extract<
      TSESTree.TypeNode,
      { type: TTypeScriptTypeParameterNodeTypeTuple[Index] }
    >;
  };
} =>
  isNode(node) &&
  node.type === AST_NODE_TYPES.TSTypeParameterInstantiation &&
  node.params.every(
    (subNode, index) =>
      parameterNodeTypeTuple[index] !== undefined &&
      subNode.type === parameterNodeTypeTuple[index],
  );
