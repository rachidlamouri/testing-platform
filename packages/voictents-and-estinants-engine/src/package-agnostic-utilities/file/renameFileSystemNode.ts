import fs from 'fs';

type FileSystemNodeRenamerInput = {
  oldFilePath: string;
  newFilePath: string;
};

/**
 * Renames a file system node
 */
export const renameFileSystemNode = ({
  oldFilePath,
  newFilePath,
}: FileSystemNodeRenamerInput): void => {
  fs.renameSync(oldFilePath, newFilePath);
};
