import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../adapter/voictent';
import { EngineFunctionConfiguration } from '../engine-program/engineFunctionConfiguration';
import { TypeScriptFile } from '../type-script-file/typeScriptFile';

// TODO: this is no longer a "File" so change the name accordingly
export type EngineProgramFile = {
  zorn: string;
  file: TypeScriptFile;
  engineFunctionConfiguration: EngineFunctionConfiguration;
};

export const ENGINE_PROGRAM_FILE_GEPP = 'engine-program-file';

export type EngineProgramFileGepp = typeof ENGINE_PROGRAM_FILE_GEPP;

export type EngineProgramFileVoictent = Voictent<
  EngineProgramFileGepp,
  EngineProgramFile
>;

export type EngineProgramFileVoque = InMemoryOdeshin2Voque<
  EngineProgramFileGepp,
  EngineProgramFile
>;
