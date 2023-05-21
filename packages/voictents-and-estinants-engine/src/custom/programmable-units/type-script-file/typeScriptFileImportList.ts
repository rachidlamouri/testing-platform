import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../adapter/voictent';

export type TypeScriptFileImport = {
  isInternal: boolean;
  sourcePath: string;
  specifierList: string[];
};

// TODO: fix this weird nested list type
export type TypeScriptFileImportList = {
  zorn: string;
  list: TypeScriptFileImport[];
};

export const TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP = 'type-script-file-import-list';

export type TypeScriptFileImportListGepp =
  typeof TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP;

export type TypeScriptFileImportListVoictent = Voictent<
  TypeScriptFileImportListGepp,
  TypeScriptFileImportList
>;

export type TypeScriptFileImportListVoque = InMemoryOdeshin2Voque<
  TypeScriptFileImportListGepp,
  TypeScriptFileImportList
>;
