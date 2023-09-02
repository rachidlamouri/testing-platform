import { InMemoryOdeshin2ListVoque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { EngineFunctionConfiguration } from '../engine-program/engineFunctionConfiguration';
import { TypeScriptFile } from '../type-script-file/typeScriptFile';

// TODO: this is no longer a "File" so change the name accordingly
export type EngineProgramFile = {
  zorn: string;
  file: TypeScriptFile;
  engineFunctionConfiguration: EngineFunctionConfiguration;
};

export const ENGINE_PROGRAM_FILE_GEPP = 'engine-program-file';

type EngineProgramFileGepp = typeof ENGINE_PROGRAM_FILE_GEPP;

export type EngineProgramFileVoque = InMemoryOdeshin2ListVoque<
  EngineProgramFileGepp,
  EngineProgramFile
>;
