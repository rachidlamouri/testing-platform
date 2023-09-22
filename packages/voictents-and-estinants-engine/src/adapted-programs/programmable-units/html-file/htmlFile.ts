import { File } from '../file/file';
import { FileExtensionSuffixIdentifier } from '../file/fileExtensionSuffixIdentifier';
import { FileSystemNodeVoque } from '../file/fileSystemNodeVoictent';

/**
 * A File object with the extension narrowed down to an html file
 */
export type HtmlFile = File<FileExtensionSuffixIdentifier.Html>;

export const HTML_FILE_GEPP = 'html-file';

type HtmlFileGepp = typeof HTML_FILE_GEPP;

export type HtmlFileVoque = FileSystemNodeVoque<HtmlFileGepp, HtmlFile>;
