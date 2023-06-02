import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { File } from '../file/file';
import { FileExtensionSuffixIdentifier } from '../file/fileExtensionSuffixIdentifier';

/**
 * A File object with the extension narrowed down to an html file
 */
export type HtmlFile = File<FileExtensionSuffixIdentifier.Html>;

export const HTML_FILE_GEPP = 'html-file';

type HtmlFileGepp = typeof HTML_FILE_GEPP;

export type HtmlFileVoque = InMemoryOdeshin2Voque<HtmlFileGepp, HtmlFile>;
