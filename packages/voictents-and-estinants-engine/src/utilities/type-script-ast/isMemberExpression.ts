import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { isNode, TypeScriptNode } from './isNode';

export const isMemberExpression = (
  node: TypeScriptNode,
): node is TSESTree.MemberExpression =>
  isNode(node) && node.type === AST_NODE_TYPES.MemberExpression;
