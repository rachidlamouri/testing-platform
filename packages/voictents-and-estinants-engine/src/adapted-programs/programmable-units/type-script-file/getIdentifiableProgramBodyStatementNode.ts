import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
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
import { isExportNamedTypeScriptEnumDeclaration } from '../../../utilities/type-script-ast/isExportNamedTypeScriptEnumDeclaration';
import { hasOneElement } from '../../../utilities/arrays/hasOneElement';
import { isExportNamedFunctionDeclaration } from '../../../utilities/type-script-ast/isExportNamedFunctionDeclaration';

export type IdentifiableProgramBodyStatementNode =
  | IdentifiableVariableDeclarator
  | IdentifiableTypeDeclaration
  | TSESTree.TSEnumDeclaration
  | { type?: never; id: TSESTree.Identifier };

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

  if (isExportNamedTypeScriptEnumDeclaration(statement)) {
    return statement.declaration;
  }

  if (isExportNamedFunctionDeclaration(statement)) {
    return { id: statement.declaration.id };
  }

  // TODO: this whole function needs to have a better return type to account for this case OR we need to make sure there are no re-exports
  if (
    statement.type === AST_NODE_TYPES.ExportNamedDeclaration &&
    statement.specifiers.length > 0
  ) {
    if (!hasOneElement(statement.specifiers)) {
      // note: the function we're in expects one identifiable node, so that would have to change, which isn't a problem, but I don't have time for that right now
      throw Error('Unsupported multi-reexport');
    }

    // using "local" here is coupled to "markUnusedExports" which I think is bad
    return { id: statement.specifiers[0].local };
  }

  // TODO: same todo as the above if statement.
  if (
    statement.type === AST_NODE_TYPES.ExportNamedDeclaration &&
    statement.declaration?.type === AST_NODE_TYPES.VariableDeclaration &&
    statement.declaration.declarations[0]?.type ===
      AST_NODE_TYPES.VariableDeclarator &&
    statement.declaration.declarations[0].id.type ===
      AST_NODE_TYPES.ObjectPattern &&
    statement.declaration.declarations[0].id.properties[0] !== undefined &&
    statement.declaration.declarations[0].id.properties[0].type ===
      AST_NODE_TYPES.Property &&
    statement.declaration.declarations[0].id.properties[0].key.type ===
      AST_NODE_TYPES.Identifier
  ) {
    return { id: statement.declaration.declarations[0].id.properties[0].key };
  }

  return null;
};
