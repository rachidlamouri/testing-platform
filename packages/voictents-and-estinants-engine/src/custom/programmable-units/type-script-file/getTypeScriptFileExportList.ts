import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  COMMENTED_PROGRAM_BODY_DECLARATION_LIST_GEPP,
  CommentedProgramBodyDeclarationListVoque,
} from './commentedProgramBodyDeclarationList';
import {
  TYPE_SCRIPT_FILE_EXPORT_LIST_GEPP,
  TypeScriptFileExport,
  TypeScriptFileExportListVoque,
} from './typeScriptFileExportList';
import { isNotNull } from '../../../utilities/isNotNull';

/**
 * Gets the identifier name for every named export in a TypeScript file
 */
export const getTypeScriptFileExportList = buildEstinant({
  name: 'getTypeScriptFileExportList',
})
  .fromHubblepup2<CommentedProgramBodyDeclarationListVoque>({
    gepp: COMMENTED_PROGRAM_BODY_DECLARATION_LIST_GEPP,
  })
  .toHubblepup2<TypeScriptFileExportListVoque>({
    gepp: TYPE_SCRIPT_FILE_EXPORT_LIST_GEPP,
  })
  .onPinbe(({ zorn: filePath, list: declarationList }) => {
    const exportList = declarationList
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
      zorn: filePath,
      list: exportList,
    };
  })
  .assemble();
