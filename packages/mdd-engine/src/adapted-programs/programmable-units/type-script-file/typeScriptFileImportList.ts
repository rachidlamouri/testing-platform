import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

export type TypeScriptFileImport = {
  isInternal: boolean;
  sourcePath: string;
  specifierList: string[];
};

type TypeScriptFileImportListInput = {
  id: string;
  filePath: string;
  list: TypeScriptFileImport[];
};

/**
 * A list of useful metadata for every import in a TypeScript file
 *
 * @todo fix this weird nested list type
 *
 * @todo rename to TypeScriptFileImportGroup
 */
export class TypeScriptFileImportList {
  id: string;

  filePath: string;

  list: TypeScriptFileImport[];

  fileImportByIdentifier: Map<string, TypeScriptFileImport>;

  constructor(input: TypeScriptFileImportListInput) {
    this.id = input.id;
    this.filePath = input.filePath;
    this.list = input.list;
    this.fileImportByIdentifier = new Map(
      input.list
        .flatMap((fileImport) => {
          return fileImport.specifierList.map((specifier) => ({
            fileImport,
            specifier,
          }));
        })
        .map(({ fileImport, specifier }) => {
          return [specifier, fileImport];
        }),
    );
  }
}

export const TYPE_SCRIPT_FILE_IMPORT_LIST_COLLECTION_ID =
  'type-script-file-import-list';

type TypeScriptFileImportListCollectionId =
  typeof TYPE_SCRIPT_FILE_IMPORT_LIST_COLLECTION_ID;

export type TypeScriptFileImportListStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    TypeScriptFileImportListCollectionId,
    TypeScriptFileImportList
  >;
