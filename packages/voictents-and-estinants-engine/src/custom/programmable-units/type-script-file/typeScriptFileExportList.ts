import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../adapter/voictent';

export type TypeScriptFileExport = {
  identifierName: string;
};

/**
 * A list of useful data for every export named declaration in a TypeScript file
 */
export type TypeScriptFileExportList = {
  zorn: string;
  list: TypeScriptFileExport[];
};

export const TYPE_SCRIPT_FILE_EXPORT_LIST_GEPP = 'type-script-file-export-list';

export type TypeScriptFileExportListGepp =
  typeof TYPE_SCRIPT_FILE_EXPORT_LIST_GEPP;

export type TypeScriptFileExportListVoictent = Voictent<
  TypeScriptFileExportListGepp,
  TypeScriptFileExportList
>;

export type TypeScriptFileExportListVoque = InMemoryOdeshin2Voque<
  TypeScriptFileExportListGepp,
  TypeScriptFileExportList
>;
