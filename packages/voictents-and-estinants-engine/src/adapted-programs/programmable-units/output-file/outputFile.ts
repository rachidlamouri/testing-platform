import { StreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';

export type FileCacheOutputFile = {
  filePath?: never;
  fileName: string;
  fileExtensionSuffix: string;
  text: string;
};

type OutputFileWithFilePath = {
  filePath: string;
  fileName?: never;
  fileExtensionSuffix?: never;
  text: string;
};

/**
 * Pre-formatted information to output to the file system under a specified file
 * extension
 */
export type OutputFile = FileCacheOutputFile | OutputFileWithFilePath;

export const OUTPUT_FILE_COLLECTION_ID = 'output-file';

type OutputFileCollectionId = typeof OUTPUT_FILE_COLLECTION_ID;

export type OutputFileStreamMetatype = StreamMetatype<
  OutputFileCollectionId,
  OutputFile,
  OutputFile,
  never,
  OutputFile[]
>;
