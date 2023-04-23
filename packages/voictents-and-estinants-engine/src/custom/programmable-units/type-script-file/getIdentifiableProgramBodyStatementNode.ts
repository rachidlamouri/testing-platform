import { TSESTree } from '@typescript-eslint/typescript-estree';
import { isExportNamedTypeDeclaration } from '../../../utilities/type-script-ast/isExportNamedTypeDeclaration';
import { isExportNamedVariableDeclaration } from '../../../utilities/type-script-ast/isExportNamedVariableDeclaration';
import {
  IdentifiableTypeDeclaration,
  isIdentifiableTypeDeclaration,
} from '../../../utilities/type-script-ast/isIdentifiableTypeDeclaration';
import {
  IdentifiableVariableDeclarator,
  isIdentifiableVariableDeclaration,
} from '../../../utilities/type-script-ast/isIdentifiableVariableDeclaration';

export type IdentifiableProgramBodyStatementNode =
  | IdentifiableVariableDeclarator
  | IdentifiableTypeDeclaration;

export const getIdentifiableProgramBodyStatementNode = (
  statement: TSESTree.ProgramStatement,
): IdentifiableProgramBodyStatementNode | null => {
  if (isExportNamedVariableDeclaration(statement)) {
    return statement.declaration.declarations[0];
  }

  if (isIdentifiableVariableDeclaration(statement)) {
    return statement.declarations[0];
  }

  if (isExportNamedTypeDeclaration(statement)) {
    return statement.declaration;
  }

  if (isIdentifiableTypeDeclaration(statement)) {
    return statement;
  }

  return null;
};
