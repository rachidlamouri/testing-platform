import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import { File } from '../file/file';
import { FileExtensionSuffixIdentifier } from '../file/fileExtensionSuffixIdentifier';

export type TsvFile = File<FileExtensionSuffixIdentifier.TabSeparatedValue>;

export type TsvFileGrition = Grition<TsvFile>;

export type TsvFileOdeshin = OdeshinFromGrition<TsvFileGrition>;

export const TSV_FILE_GEPP = 'tsv-file';

export type TsvFileGepp = typeof TSV_FILE_GEPP;

export type TsvFileVoictent = Voictent<TsvFileGepp, TsvFileOdeshin>;
