import { File } from '../file/file';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { FileSystemNodeStreamMetatype } from '../file/fileSystemNodeVoictent';

/**
 * A File object with the extension narrowed down to a bash file
 */
export type BashFile = File<FileExtensionSuffixIdentifier.Bash>;

export const BASH_FILE_GEPP = 'bash-file';

type BashFileGepp = typeof BASH_FILE_GEPP;

export type BashFileVoque = FileSystemNodeStreamMetatype<
  BashFileGepp,
  BashFile
>;
