import { getZorn } from './getZorn';

type FileLocator = {
  filePath: string;
};

export const getFileZorn = (locator: FileLocator): string => {
  return getZorn([locator.filePath]);
};
