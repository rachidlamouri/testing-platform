import { posix } from 'path';

export const getFileSystemNodePathPartList = (nodePath: string): string[] => {
  return nodePath.split(posix.sep);
};
