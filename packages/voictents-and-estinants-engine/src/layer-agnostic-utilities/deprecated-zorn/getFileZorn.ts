import { getZorn } from './getZorn';

type FileLocator = {
  filePath: string;
};

/**
 * An outdated utility for getting the identifier of a file
 *
 * @deprecated
 */
export const getFileZorn = (locator: FileLocator): string => {
  return getZorn([locator.filePath]);
};
