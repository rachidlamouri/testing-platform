import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { isNotNullish } from '../nil/isNotNullish';
import { Functionish, isFunctionish } from './isFunctionish';
import { NullishableTypeScriptNode } from './isNode';

// note: an assertion is a predicate
export const isPredicateFunctionish = (
  node: NullishableTypeScriptNode,
): node is Functionish =>
  isNotNullish(node) &&
  isFunctionish(node) &&
  node.returnType?.typeAnnotation?.type === AST_NODE_TYPES.TSTypePredicate;
