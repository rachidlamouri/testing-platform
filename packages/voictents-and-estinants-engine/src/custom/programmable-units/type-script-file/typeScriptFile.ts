import { Voictent } from '../../../type-script-adapter/voictent';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { File } from '../file/file';
import { FileExtensionSuffixIdentifier } from '../file/fileExtensionSuffixIdentifier';

export type TypeScriptFile = File<FileExtensionSuffixIdentifier.TypeScript>;

export type TypeScriptFileGrition = Grition<TypeScriptFile>;

export type TypeScriptFileOdeshin = OdeshinFromGrition<TypeScriptFileGrition>;

export const TYPE_SCRIPT_FILE_GEPP = 'type-script-file';

export type TypeScriptFileGepp = typeof TYPE_SCRIPT_FILE_GEPP;

export type TypeScriptFileVoictent = Voictent<
  TypeScriptFileGepp,
  TypeScriptFileOdeshin
>;
