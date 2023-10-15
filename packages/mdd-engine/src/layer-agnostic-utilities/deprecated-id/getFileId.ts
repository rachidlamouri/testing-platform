import { getId } from './getId';

type FileLocator = {
  filePath: string;
};

/**
 * An outdated utility for getting the identifier of a file
 *
 * @deprecated
 *
 * @readableName getFileId
 */
export const getFileId = (locator: FileLocator): string => {
  return getId([locator.filePath]);
};
