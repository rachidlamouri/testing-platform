import { isSpecificCallExpression } from '../../../../utilities/type-script-ast/isCallExpression';
import { IdentifiableCallExpression } from '../../../../utilities/type-script-ast/isIdentifiableCallExpression';
import {
  isNode,
  TypeScriptNode,
} from '../../../../utilities/type-script-ast/isNode';
import { ParameterizedCallExpression } from '../../../../utilities/type-script-ast/isParameterizedCallExpression';
import {
  isTypeScriptTypeParameterInstantiationWithParameterTuple,
  TypeScriptTypeParameterNodeTuple,
  TypeScriptTypeParameterNodeTupleToTypeScriptTypeParameterNodeTypeTuple,
} from '../../../../utilities/type-script-ast/isTypeScriptTypeParameterInstantiation';

export type BaseEstinantCallExpression<
  TName extends string,
  TTypeScriptTypeParameterNodeTuple extends TypeScriptTypeParameterNodeTuple,
> = IdentifiableCallExpression<TName> &
  ParameterizedCallExpression<TTypeScriptTypeParameterNodeTuple>;

type EstinantCallExpressionPredicate<
  TName extends string,
  TTypeScriptTypeParameterNodeTuple extends TypeScriptTypeParameterNodeTuple,
> = (
  node: TypeScriptNode,
) => node is BaseEstinantCallExpression<
  TName,
  TTypeScriptTypeParameterNodeTuple
>;

export const buildIsEstinantCallExpression = <
  TName extends string,
  TTypeScriptTypeParameterNodeTuple extends TypeScriptTypeParameterNodeTuple,
>(
  calleeName: TName,
  parameterNodeTypeTuple: TypeScriptTypeParameterNodeTupleToTypeScriptTypeParameterNodeTypeTuple<TTypeScriptTypeParameterNodeTuple>,
): EstinantCallExpressionPredicate<
  TName,
  TTypeScriptTypeParameterNodeTuple
> => {
  const isEstinantCallExpression: EstinantCallExpressionPredicate<
    TName,
    TTypeScriptTypeParameterNodeTuple
  > = (
    node,
  ): node is BaseEstinantCallExpression<
    TName,
    TTypeScriptTypeParameterNodeTuple
  > => {
    return (
      isNode(node) &&
      isSpecificCallExpression(node, calleeName) &&
      isTypeScriptTypeParameterInstantiationWithParameterTuple(
        node.typeParameters,
        parameterNodeTypeTuple,
      )
    );
  };

  return isEstinantCallExpression;
};
