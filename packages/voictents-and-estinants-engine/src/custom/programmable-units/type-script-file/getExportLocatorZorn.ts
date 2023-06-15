import { getZorn } from '../../../utilities/getZorn';

type ExportLocator = {
  filePath: string;
  identifierName: string;
};

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export const getExportLocatorZorn = (locator: ExportLocator): string => {
  return getZorn([locator.filePath, locator.identifierName]);
};
