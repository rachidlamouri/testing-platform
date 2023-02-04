// Skip

import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';

export type ExportDeclaration =
  | TSESTree.ExportNamedDeclaration
  | TSESTree.ExportAllDeclaration;

export const getExportDeclarations = (
  program: TSESTree.Program,
): ExportDeclaration[] => {
  const declarations = program.body.filter(
    (statement): statement is ExportDeclaration => {
      return (
        statement.type === AST_NODE_TYPES.ExportNamedDeclaration ||
        statement.type === AST_NODE_TYPES.ExportAllDeclaration
      );
    },
  );

  return declarations;
};
