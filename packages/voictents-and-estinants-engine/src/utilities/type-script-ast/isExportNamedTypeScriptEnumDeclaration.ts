import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { TypeScriptNode, isNode } from './isNode';

type ExportNamedTypeScriptEnumDeclaration = TSESTree.ExportNamedDeclaration & {
  declaration: TSESTree.TSEnumDeclaration;
};

export const isExportNamedTypeScriptEnumDeclaration = (
  node: TypeScriptNode,
): node is ExportNamedTypeScriptEnumDeclaration =>
  isNode(node) &&
  node.type === AST_NODE_TYPES.ExportNamedDeclaration &&
  node.declaration?.type === AST_NODE_TYPES.TSEnumDeclaration;
