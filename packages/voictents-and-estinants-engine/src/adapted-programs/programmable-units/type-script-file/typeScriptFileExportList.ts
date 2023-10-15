import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

export type TypeScriptFileExport = {
  identifierName: string;
};

/**
 * A list of useful data for every export named declaration in a TypeScript file
 */
type TypeScriptFileExportList = {
  id: string;
  filePath: string;
  list: TypeScriptFileExport[];
};

export const TYPE_SCRIPT_FILE_EXPORT_LIST_COLLECTION_ID =
  'type-script-file-export-list';

type TypeScriptFileExportListCollectionId =
  typeof TYPE_SCRIPT_FILE_EXPORT_LIST_COLLECTION_ID;

export type TypeScriptFileExportListStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    TypeScriptFileExportListCollectionId,
    TypeScriptFileExportList
  >;
