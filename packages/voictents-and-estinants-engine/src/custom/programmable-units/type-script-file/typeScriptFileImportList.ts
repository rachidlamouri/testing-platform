import { Merge } from '../../../utilities/merge';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export enum TypeScriptFileImportTypeName {
  Local = 'Local',
  External = 'External',
}

type BaseTypeScriptFileImport<
  TTypeName extends TypeScriptFileImportTypeName,
  TProperties extends object,
> = Merge<{ typeName: TTypeName; specifierList: string[] }, TProperties>;

export type LocalTypeScriptFileImport = BaseTypeScriptFileImport<
  TypeScriptFileImportTypeName.Local,
  { filePath: string }
>;

export type ExternalTypeScriptFileImport = BaseTypeScriptFileImport<
  TypeScriptFileImportTypeName.External,
  { moduleName: string }
>;

export type TypeScriptFileImport =
  | LocalTypeScriptFileImport
  | ExternalTypeScriptFileImport;

export const getSourcePath = (importItem: TypeScriptFileImport): string =>
  importItem.typeName === TypeScriptFileImportTypeName.Local
    ? importItem.filePath
    : importItem.moduleName;

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
