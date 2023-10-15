import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { NamedClassDeclaration } from './isNamedClassDeclaration';
import { isIdentifiableTypeDeclaration } from './isIdentifiableTypeDeclaration';

type ExportNamedTypeDeclaration = TSESTree.ExportNamedDeclaration & {
  declaration: TSESTree.TSTypeAliasDeclaration | NamedClassDeclaration;
};

export const isExportNamedTypeDeclaration = (
  statement: TSESTree.ProgramStatement,
): statement is ExportNamedTypeDeclaration =>
  statement.type === AST_NODE_TYPES.ExportNamedDeclaration &&
  isIdentifiableTypeDeclaration(statement.declaration);
