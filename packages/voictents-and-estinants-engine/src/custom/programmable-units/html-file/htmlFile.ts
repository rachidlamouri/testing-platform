import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import { File } from '../file/file';
import { FileExtensionSuffixIdentifier } from '../file/fileExtensionSuffixIdentifier';

export type HtmlFile = File<FileExtensionSuffixIdentifier.Html>;

export type HtmlFileGrition = Grition<HtmlFile>;

export type HtmlFileOdeshin = OdeshinFromGrition<HtmlFileGrition>;

export const HTML_FILE_GEPP = 'html-file';

export type HtmlFileGepp = typeof HTML_FILE_GEPP;

export type HtmlFileVoictent = Voictent<HtmlFileGepp, HtmlFileOdeshin>;