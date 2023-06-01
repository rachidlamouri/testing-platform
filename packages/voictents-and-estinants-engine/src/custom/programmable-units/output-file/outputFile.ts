import { Voque } from '../../../core/engine/voque';
import { Voictent } from '../../adapter/voictent';

/**
 * Pre-formatted information to output to the file system under a specified file
 * extension
 */
export type OutputFile = {
  fileName: string;
  fileExtensionSuffix: string;
  text: string;
};

export const OUTPUT_FILE_GEPP = 'output-file';

export type OutputFileGepp = typeof OUTPUT_FILE_GEPP;

export type OutputFileVoictent = Voictent<OutputFileGepp, OutputFile>;

export type OutputFileVoque = Voque<
  OutputFileGepp,
  OutputFile,
  OutputFile,
  never,
  OutputFile[]
>;
