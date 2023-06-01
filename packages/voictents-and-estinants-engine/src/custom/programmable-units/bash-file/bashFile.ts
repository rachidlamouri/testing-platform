import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../adapter/voictent';
import { File } from '../file/file';
import { FileExtensionSuffixIdentifier } from '../file/fileExtensionSuffixIdentifier';

/**
 * A File object with the extension narrowed down to a bash file
 */
export type BashFile = File<FileExtensionSuffixIdentifier.Bash>;

export const BASH_FILE_GEPP = 'bash-file';

export type BashFileGepp = typeof BASH_FILE_GEPP;

export type BashFileVoictent = Voictent<BashFileGepp, BashFile>;

export type BashFileVoque = InMemoryOdeshin2Voque<BashFileGepp, BashFile>;
