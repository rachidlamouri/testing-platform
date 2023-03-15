import { HubblepupDalph } from '../../../type-script-adapter/hubblepup';
import { Grition } from '../../adapter/grition';
import { Voictent } from '../../adapter/voictent';

export type OutputFile = {
  fileName: string;
  fileExtensionSuffix: string;
  text: string;
};

export type OutputFileGrition = Grition<OutputFile>;

export type OutputFileHubblepup = HubblepupDalph<OutputFileGrition>;

export const OUTPUT_FILE_GEPP = 'output-file';

export type OutputFileGepp = typeof OUTPUT_FILE_GEPP;

export type OutputFileVoictent = Voictent<OutputFileGepp, OutputFileHubblepup>;
