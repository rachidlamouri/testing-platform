import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

export type TypeScriptFileImport = {
  isInternal: boolean;
  sourcePath: string;
  specifierList: string[];
};

/**
 * A list of useful metadata for every import in a TypeScript file
 *
 * @todo fix this weird nested list type
 */
export type TypeScriptFileImportList = {
  id: string;
  filePath: string;
  list: TypeScriptFileImport[];
};

export const TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP = 'type-script-file-import-list';

type TypeScriptFileImportListGepp = typeof TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP;

export type TypeScriptFileImportListVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    TypeScriptFileImportListGepp,
    TypeScriptFileImportList
  >;
