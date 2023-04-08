import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type TypeScriptFileImport = {
  isInternal: boolean;
  sourcePath: string;
  specifierList: string[];
};

export type TypeScriptFileImportList = TypeScriptFileImport[];

export type TypeScriptFileImportListGrition = Grition<TypeScriptFileImportList>;

export type TypeScriptFileImportListOdeshin =
  OdeshinFromGrition<TypeScriptFileImportListGrition>;

export const TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP = 'type-script-file-import-list';

export type TypeScriptFileImportListGepp =
  typeof TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP;

export type TypeScriptFileImportListVoictent = Voictent<
  TypeScriptFileImportListGepp,
  TypeScriptFileImportListOdeshin
>;
