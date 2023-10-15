import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { EngineFunctionConfiguration } from '../engine-program-model/engineFunctionConfiguration';
import { TypeScriptFile } from '../type-script-file/typeScriptFile';

/**
 * A file that calls the core engine or the adapted engine
 */
export type EngineProgramFile = {
  id: string;
  file: TypeScriptFile;
  engineFunctionConfiguration: EngineFunctionConfiguration;
};

export const ENGINE_PROGRAM_FILE_COLLECTION_ID = 'engine-program-file';

type EngineProgramFileCollectionId = typeof ENGINE_PROGRAM_FILE_COLLECTION_ID;

export type EngineProgramFileStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    EngineProgramFileCollectionId,
    EngineProgramFile
  >;
