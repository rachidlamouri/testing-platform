import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../adapter/voictent';
import { File } from '../file/file';
import { FileExtensionSuffixIdentifier } from '../file/fileExtensionSuffixIdentifier';

export type BashFile = File<FileExtensionSuffixIdentifier.Bash>;

export const BASH_FILE_GEPP = 'bash-file';

export type BashFileGepp = typeof BASH_FILE_GEPP;

export type BashFileVoictent = Voictent<BashFileGepp, BashFile>;

export type BashFileVoque = InMemoryOdeshin2Voque<BashFileGepp, BashFile>;
