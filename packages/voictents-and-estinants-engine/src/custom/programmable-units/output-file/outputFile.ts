import { StandardInMemoryVoque } from '../../../core/engine/inMemoryVoque';
import { Voictent } from '../../adapter/voictent';

export type OutputFile = {
  fileName: string;
  fileExtensionSuffix: string;
  text: string;
};

export const OUTPUT_FILE_GEPP = 'output-file';

export type OutputFileGepp = typeof OUTPUT_FILE_GEPP;

export type OutputFileVoictent = Voictent<OutputFileGepp, OutputFile>;

export type OutputFileVoque = StandardInMemoryVoque<OutputFileGepp, OutputFile>;
