import { Voque } from '../../../core/engine/voque';

/**
 * Pre-formatted information to output to the file system under a specified file
 * extension
 */
export type OutputFile =
  | {
      filePath?: never;
      fileName: string;
      fileExtensionSuffix: string;
      text: string;
    }
  | {
      filePath: string;
      fileName?: never;
      fileExtensionSuffix?: never;
      text: string;
    };

export const OUTPUT_FILE_GEPP = 'output-file';

type OutputFileGepp = typeof OUTPUT_FILE_GEPP;

export type OutputFileVoque = Voque<
  OutputFileGepp,
  OutputFile,
  OutputFile,
  never,
  OutputFile[]
>;
