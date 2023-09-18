import { InMemoryOdeshin2ListVoque } from '../../../core/engine/inMemoryOdeshinVoictent2';

export type TypeScriptFileExport = {
  identifierName: string;
};

/**
 * A list of useful data for every export named declaration in a TypeScript file
 */
type TypeScriptFileExportList = {
  zorn: string;
  filePath: string;
  list: TypeScriptFileExport[];
};

export const TYPE_SCRIPT_FILE_EXPORT_LIST_GEPP = 'type-script-file-export-list';

type TypeScriptFileExportListGepp = typeof TYPE_SCRIPT_FILE_EXPORT_LIST_GEPP;

export type TypeScriptFileExportListVoque = InMemoryOdeshin2ListVoque<
  TypeScriptFileExportListGepp,
  TypeScriptFileExportList
>;
