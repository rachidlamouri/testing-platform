import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { TypeScriptNode, isNode } from './isNode';

export const isStringLiteral = (
  node: TypeScriptNode,
): node is TSESTree.StringLiteral =>
  isNode(node) &&
  node.type === AST_NODE_TYPES.Literal &&
  typeof node.value === 'string';
