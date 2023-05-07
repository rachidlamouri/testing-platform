import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import { EngineFunctionConfiguration } from '../engine-program/engineFunctionConfiguration';
import { TypeScriptFile } from '../type-script-file/typeScriptFile';

// TODO: this is no longer a "File" so change the name accordingly
export type EngineProgramFile = {
  file: TypeScriptFile;
  engineFunctionConfiguration: EngineFunctionConfiguration;
};

export type EngineProgramFileGrition = Grition<EngineProgramFile>;

export type EngineProgramFileOdeshin =
  OdeshinFromGrition<EngineProgramFileGrition>;

export const ENGINE_PROGRAM_FILE_GEPP = 'engine-program-file';

export type EngineProgramFileGepp = typeof ENGINE_PROGRAM_FILE_GEPP;

export type EngineProgramFileVoictent = Voictent<
  EngineProgramFileGepp,
  EngineProgramFileOdeshin
>;
