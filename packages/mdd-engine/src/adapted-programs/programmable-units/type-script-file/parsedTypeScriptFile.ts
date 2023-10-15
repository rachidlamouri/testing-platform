import { TSESTree } from '@typescript-eslint/typescript-estree';
import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { FilePath } from '../file/filePath';

/**
 * Contains the AST for a TypeScript file as well as the information needed to
 * join it back to the source file or other related objects
 */
type ParsedTypeScriptFile = {
  id: string;
  /** @deprecated */
  filePath: string;
  // TODO: remove the string file path and rename this object to filePath
  filePathObject: FilePath;
  program: TSESTree.Program;
};

export const PARSED_TYPE_SCRIPT_FILE_COLLECTION_ID = 'parsed-type-script-file';

type ParsedTypeScriptFileCollectionId =
  typeof PARSED_TYPE_SCRIPT_FILE_COLLECTION_ID;

export type ParsedTypeScriptFileStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    ParsedTypeScriptFileCollectionId,
    ParsedTypeScriptFile
  >;
