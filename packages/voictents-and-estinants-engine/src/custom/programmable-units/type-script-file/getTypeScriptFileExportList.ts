import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import {
  ExportNamedTypeDeclaration,
  isExportNamedTypeDeclaration,
} from '../../../utilities/type-script-ast/isExportNamedTypeDeclaration';
import {
  ExportNamedVariableDeclaration,
  isExportNamedVariableDeclaration,
} from '../../../utilities/type-script-ast/isExportNamedVariableDeclaration';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ParsedTypeScriptFileVoictent,
  PARSED_TYPE_SCRIPT_FILE_GEPP,
} from './parsedTypeScriptFile';
import {
  TypeScriptFileExportListVoictent,
  TYPE_SCRIPT_FILE_EXPORT_LIST_GEPP,
  TypeScriptFileExport,
  TypeScriptFileExportTypeName,
} from './typeScriptFileExportList';

export const getTypeScriptFileExportList = buildEstinant()
  .fromGrition<ParsedTypeScriptFileVoictent>({
    gepp: PARSED_TYPE_SCRIPT_FILE_GEPP,
  })
  .toGrition<TypeScriptFileExportListVoictent>({
    gepp: TYPE_SCRIPT_FILE_EXPORT_LIST_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((input) => {
    const exportList = input.program.body
      .filter(
        (
          statement,
        ): statement is
          | ExportNamedVariableDeclaration
          | ExportNamedTypeDeclaration =>
          isExportNamedVariableDeclaration(statement) ||
          isExportNamedTypeDeclaration(statement),
      )
      .map<TypeScriptFileExport>((statement) => {
        if (statement.declaration.type === AST_NODE_TYPES.VariableDeclaration) {
          return {
            typeName: TypeScriptFileExportTypeName.VARIABLE,
            identifier: statement.declaration.declarations[0].id.name,
          };
        }

        return {
          typeName: TypeScriptFileExportTypeName.TYPE,
          identifier: statement.declaration.id.name,
        };
      });

    return exportList;
  })
  .assemble();
