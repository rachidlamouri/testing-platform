import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { isNotNullish } from '../nil/isNotNullish';
import { NullishableTypeScriptNode } from './isNode';

export type Functionish =
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression
  | TSESTree.ArrowFunctionExpression;

/**
 * @note there are other function types, but I don't know what they are. See {@link TSESTree.FunctionLike}
 */
const functionishTypeNameSet = new Set([
  AST_NODE_TYPES.FunctionDeclaration,
  AST_NODE_TYPES.FunctionExpression,
  AST_NODE_TYPES.ArrowFunctionExpression,
]);

export const isFunctionish = (
  node: NullishableTypeScriptNode,
): node is Functionish =>
  isNotNullish(node) && functionishTypeNameSet.has(node.type);
