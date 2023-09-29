import { Voque } from '../../../core/types/voque/voque';

export type FileCacheOutputFile = {
  filePath?: never;
  fileName: string;
  fileExtensionSuffix: string;
  text: string;
};

type OutputFileWithFilePath = {
  filePath: string;
  fileName?: never;
  fileExtensionSuffix?: never;
  text: string;
};

/**
 * Pre-formatted information to output to the file system under a specified file
 * extension
 */
export type OutputFile = FileCacheOutputFile | OutputFileWithFilePath;

export const OUTPUT_FILE_GEPP = 'output-file';

type OutputFileGepp = typeof OUTPUT_FILE_GEPP;

export type OutputFileVoque = Voque<
  OutputFileGepp,
  OutputFile,
  OutputFile,
  never,
  OutputFile[]
>;
