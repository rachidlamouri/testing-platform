import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { EngineFunctionConfiguration } from '../engine-program/engineFunctionConfiguration';
import { TypeScriptFile } from '../type-script-file/typeScriptFile';

/**
 * A file that calls the core engine or the adapted engine
 */
export type EngineProgramFile = {
  zorn: string;
  file: TypeScriptFile;
  engineFunctionConfiguration: EngineFunctionConfiguration;
};

export const ENGINE_PROGRAM_FILE_GEPP = 'engine-program-file';

type EngineProgramFileGepp = typeof ENGINE_PROGRAM_FILE_GEPP;

export type EngineProgramFileVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    EngineProgramFileGepp,
    EngineProgramFile
  >;
