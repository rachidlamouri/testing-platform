import { InMemoryOdeshin2ListVoque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { File2 } from '../file/file2';
import { FileExtensionSuffixIdentifier } from '../file/fileExtensionSuffixIdentifier';

/**
 * A File object with the extension narrowed down to a TypeScript file
 */
export type TypeScriptFile = File2<FileExtensionSuffixIdentifier.TypeScript>;

export const TYPE_SCRIPT_FILE_GEPP = 'type-script-file';

type TypeScriptFileGepp = typeof TYPE_SCRIPT_FILE_GEPP;

export type TypeScriptFileVoque = InMemoryOdeshin2ListVoque<
  TypeScriptFileGepp,
  TypeScriptFile
>;
