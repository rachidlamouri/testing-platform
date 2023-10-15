import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  TYPE_SCRIPT_FILE_EXPORT_LIST_COLLECTION_ID,
  TypeScriptFileExport,
  TypeScriptFileExportListStreamMetatype,
} from './typeScriptFileExportList';
import { isNotNull } from '../../../package-agnostic-utilities/nil/isNotNull';
import {
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  FileCommentedProgramBodyDeclarationGroupStreamMetatype,
} from './fileCommentedProgramBodyDeclarationGroup';

/**
 * Gets the identifier name for every named export in a TypeScript file
 */
export const getTypeScriptFileExportList = buildProgrammedTransform({
  name: 'getTypeScriptFileExportList',
})
  .fromItem2<FileCommentedProgramBodyDeclarationGroupStreamMetatype>({
    collectionId: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  })
  .toItem2<TypeScriptFileExportListStreamMetatype>({
    collectionId: TYPE_SCRIPT_FILE_EXPORT_LIST_COLLECTION_ID,
  })
  .onTransform((group) => {
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
      id: group.filePath,
      filePath: group.filePath,
      list: exportList,
    };
  })
  .assemble();
