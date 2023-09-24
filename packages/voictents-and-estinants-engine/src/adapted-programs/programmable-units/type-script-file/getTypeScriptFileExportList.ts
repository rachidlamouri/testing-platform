import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  TYPE_SCRIPT_FILE_EXPORT_LIST_GEPP,
  TypeScriptFileExport,
  TypeScriptFileExportListVoque,
} from './typeScriptFileExportList';
import { isNotNull } from '../../../utilities/nil/isNotNull';
import {
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
  FileCommentedProgramBodyDeclarationGroupVoque,
} from './fileCommentedProgramBodyDeclarationGroup';

/**
 * Gets the identifier name for every named export in a TypeScript file
 */
export const getTypeScriptFileExportList = buildEstinant({
  name: 'getTypeScriptFileExportList',
})
  .fromHubblepup2<FileCommentedProgramBodyDeclarationGroupVoque>({
    gepp: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
  })
  .toHubblepup2<TypeScriptFileExportListVoque>({
    gepp: TYPE_SCRIPT_FILE_EXPORT_LIST_GEPP,
  })
  .onPinbe((group) => {
    const exportList = group.list
      .filter((declaration) => {
        return (
          declaration.bodyStatement.type ===
          AST_NODE_TYPES.ExportNamedDeclaration
        );
      })
      .map((declaration) => declaration.identifiableNode)
      .filter(isNotNull)
      .map<TypeScriptFileExport>((node) => ({
        identifierName: node.id.name,
      }));

    return {
      zorn: group.filePath,
      filePath: group.filePath,
      list: exportList,
    };
  })
  .assemble();
