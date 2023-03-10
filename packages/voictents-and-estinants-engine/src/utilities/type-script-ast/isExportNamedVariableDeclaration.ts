import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import {
  IdentifiableVariableDeclaration,
  isIdentifiableVariableDeclaration,
} from './isIdentifiableVariableDeclaration';

export type ExportNamedVariableDeclaration = TSESTree.ExportNamedDeclaration & {
  declaration: IdentifiableVariableDeclaration;
};

export const isExportNamedVariableDeclaration = (
  node: TSESTree.Node,
): node is ExportNamedVariableDeclaration =>
  node.type === AST_NODE_TYPES.ExportNamedDeclaration &&
  node.declaration !== null &&
  isIdentifiableVariableDeclaration(node.declaration);
