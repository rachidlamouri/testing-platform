import { File } from '../file/file';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { FileSystemNodeStreamMetatype } from '../file/fileSystemNodeCollection';

/**
 * A File object with the extension narrowed down to a TypeScript file
 */
export type TypeScriptFile = File<
  | FileExtensionSuffixIdentifier.TypeScript
  | FileExtensionSuffixIdentifier.TypeScriptXml
>;

export const TYPE_SCRIPT_FILE_COLLECTION_ID = 'type-script-file';

type TypeScriptFileCollectionId = typeof TYPE_SCRIPT_FILE_COLLECTION_ID;

export type TypeScriptFileStreamMetatype = FileSystemNodeStreamMetatype<
  TypeScriptFileCollectionId,
  TypeScriptFile
>;
