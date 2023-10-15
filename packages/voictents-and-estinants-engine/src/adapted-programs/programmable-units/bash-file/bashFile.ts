import { File } from '../file/file';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { FileSystemNodeStreamMetatype } from '../file/fileSystemNodeCollection';

/**
 * A File object with the extension narrowed down to a bash file
 */
export type BashFile = File<FileExtensionSuffixIdentifier.Bash>;

export const BASH_FILE_COLLECTION_ID = 'bash-file';

type BashFileGepp = typeof BASH_FILE_COLLECTION_ID;

export type BashFileStreamMetatype = FileSystemNodeStreamMetatype<
  BashFileGepp,
  BashFile
>;
