import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export enum TypeScriptFileExportTypeName {
  VARIABLE = 'Variable',
  TYPE = 'TYPE',
}

export type TypeScriptFileExport = {
  typeName: TypeScriptFileExportTypeName;
  identifier: string;
};

export type TypeScriptFileExportList = TypeScriptFileExport[];

export type TypeScriptFileExportListGrition = Grition<TypeScriptFileExportList>;

export type TypeScriptFileExportListOdeshin =
  OdeshinFromGrition<TypeScriptFileExportListGrition>;

export const TYPE_SCRIPT_FILE_EXPORT_LIST_GEPP = 'type-script-file-export-list';

export type TypeScriptFileExportListGepp =
  typeof TYPE_SCRIPT_FILE_EXPORT_LIST_GEPP;

export type TypeScriptFileExportListVoictent = Voictent<
  TypeScriptFileExportListGepp,
  TypeScriptFileExportListOdeshin
>;
