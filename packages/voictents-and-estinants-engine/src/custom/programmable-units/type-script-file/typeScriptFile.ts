import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { File } from '../file/file';
import { FileExtensionSuffixIdentifier } from '../file/fileExtensionSuffixIdentifier';

/**
 * A File object with the extension narrowed down to a TypeScript file
 */
export type TypeScriptFile = File<FileExtensionSuffixIdentifier.TypeScript>;

export const TYPE_SCRIPT_FILE_GEPP = 'type-script-file';

type TypeScriptFileGepp = typeof TYPE_SCRIPT_FILE_GEPP;

export type TypeScriptFileVoque = InMemoryOdeshin2Voque<
  TypeScriptFileGepp,
  TypeScriptFile
>;
