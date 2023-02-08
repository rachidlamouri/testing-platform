import { FileExtensionSuffixIdentifier } from '../../utilities/file/fileExtensionSuffixIdentifier';
import { FileA, FileAOdeshin, FileAPlifal } from './fileA';

export type TypeScriptFileA = FileA<FileExtensionSuffixIdentifier.TypeScript>;

export type TypeScriptFileAOdeshin = FileAOdeshin<TypeScriptFileA>;

export const TYPE_SCRIPT_FILE_A_GEPP = Symbol('type-script-file-a');

export type TypeScriptFileAGepp = typeof TYPE_SCRIPT_FILE_A_GEPP;

export type TypeScriptFileAPlifal = FileAPlifal<[TypeScriptFileAGepp]>;

export type TypeScriptFileAPlifalTuple = readonly TypeScriptFileAPlifal[];
