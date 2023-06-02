import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { TypeScriptNode, isNode } from './isNode';
import {
  IdentifiableTypeScriptTypeReference,
  isIdentifiableTypeScriptTypeReference,
} from './isIdentifiableTypeScriptTypeReference';

type ConstantTypeScriptAsExpression<TExpression extends TSESTree.Expression> =
  TSESTree.TSAsExpression & {
    typeAnnotation: IdentifiableTypeScriptTypeReference<'const'>;
    expression: TExpression;
  };

export const isSpecificConstantTypeScriptAsExpression = <
  TExpression extends TSESTree.Expression,
>(
  node: TypeScriptNode,
  predicate: (expression: TypeScriptNode) => expression is TExpression,
): node is ConstantTypeScriptAsExpression<TExpression> =>
  isNode(node) &&
  node.type === AST_NODE_TYPES.TSAsExpression &&
  isIdentifiableTypeScriptTypeReference(node.typeAnnotation) &&
  node.typeAnnotation.typeName.name === 'const' &&
  predicate(node.expression);
