import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import {
  IdentifiableFunctionDeclaration,
  isIdentifiableFunctionDeclaration,
} from './isIdentifiableFunctionDeclaration';

type ExportNamedFunctionDeclaration = TSESTree.ExportNamedDeclaration & {
  declaration: IdentifiableFunctionDeclaration;
};

export const isExportNamedFunctionDeclaration = (
  node: TSESTree.Node,
): node is ExportNamedFunctionDeclaration =>
  node.type === AST_NODE_TYPES.ExportNamedDeclaration &&
  node.declaration !== null &&
  isIdentifiableFunctionDeclaration(node.declaration);
