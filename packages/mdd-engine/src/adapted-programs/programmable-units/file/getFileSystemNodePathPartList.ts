import { posix } from 'path';

/**
 * Encapsulates how to get the segments of a file system node path
 */
export const getFileSystemNodePathPartList = (nodePath: string): string[] => {
  return nodePath.split(posix.sep);
};
