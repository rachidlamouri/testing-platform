import fs from 'fs';
import { posix } from 'path';

/**
 * Attempts to resolve a file path, extensionless file path, or a directory
 */
export const resolveFileSystemNodePath = (
  potentiallyPartialFilePath: string,
): string[] => {
  if (fs.existsSync(potentiallyPartialFilePath)) {
    return [potentiallyPartialFilePath];
  }

  const directoryPath = posix.dirname(potentiallyPartialFilePath);

  if (!fs.existsSync(directoryPath)) {
    return [];
  }

  const directoryFileList = fs.readdirSync(directoryPath).map((fileName) => {
    return posix.join(directoryPath, fileName);
  });

  const matchList = directoryFileList.filter((filePath) => {
    return filePath.startsWith(potentiallyPartialFilePath);
  });

  return matchList;
};
