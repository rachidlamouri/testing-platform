import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import { TypeScriptFile } from '../type-script-file/typeScriptFile';

export type EngineProgramFile = TypeScriptFile;

export type EngineProgramFileGrition = Grition<EngineProgramFile>;

export type EngineProgramFileOdeshin =
  OdeshinFromGrition<EngineProgramFileGrition>;

export const ENGINE_PROGRAM_FILE_GEPP = 'engine-program-file';

export type EngineProgramFileGepp = typeof ENGINE_PROGRAM_FILE_GEPP;

export type EngineProgramFileVoictent = Voictent<
  EngineProgramFileGepp,
  EngineProgramFileOdeshin
>;
