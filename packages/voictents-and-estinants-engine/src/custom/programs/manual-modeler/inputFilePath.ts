import { StandardInMemoryVoque } from '../../../core/engine/inMemoryVoque';

// A file path pulled from the command line
export type InputFilePath = string;

export const INPUT_FILE_PATH_GEPP = 'input-file-path';

export type InputFilePathGepp = typeof INPUT_FILE_PATH_GEPP;

export type InputFilePathVoque = StandardInMemoryVoque<
  InputFilePathGepp,
  InputFilePath
>;
