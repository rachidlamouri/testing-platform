import { getZorn } from './getZorn';

export type FileLocator = {
  filePath: string;
};

export const getFileZorn = (locator: FileLocator): string => {
  return getZorn([locator.filePath]);
};
