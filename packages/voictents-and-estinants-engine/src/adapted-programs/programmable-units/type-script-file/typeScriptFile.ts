import { File } from '../file/file';
import { FileExtensionSuffixIdentifier } from '../file/fileExtensionSuffixIdentifier';
import { FileSystemNodeVoque } from '../file/fileSystemNodeVoictent';

/**
 * A File object with the extension narrowed down to a TypeScript file
 */
export type TypeScriptFile = File<FileExtensionSuffixIdentifier.TypeScript>;

export const TYPE_SCRIPT_FILE_GEPP = 'type-script-file';

type TypeScriptFileGepp = typeof TYPE_SCRIPT_FILE_GEPP;

export type TypeScriptFileVoque = FileSystemNodeVoque<
  TypeScriptFileGepp,
  TypeScriptFile
>;