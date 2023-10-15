import { File } from '../file/file';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { FileSystemNodeStreamMetatype } from '../file/fileSystemNodeVoictent';

/**
 * A File object with the extension narrowed down to an html file
 */
export type HtmlFile = File<FileExtensionSuffixIdentifier.Html>;

export const HTML_FILE_COLLECTION_ID = 'html-file';

type HtmlFileCollectionId = typeof HTML_FILE_COLLECTION_ID;

export type HtmlFileStreamMetatype = FileSystemNodeStreamMetatype<
  HtmlFileCollectionId,
  HtmlFile
>;
