import { getZorn } from '../../../layer-agnostic-utilities/deprecated-zorn/getZorn';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../package-agnostic-utilities/datastructure/zorn';

type ExportLocator = {
  filePath: string;
  identifierName: string;
};

/**
 * This is part of an outdated identifier pattern. Use the Zorn class instead.
 * @deprecated
 */
export const getExportLocatorZorn = (locator: ExportLocator): string => {
  return getZorn([locator.filePath, locator.identifierName]);
};

const EXPORT_LOCATOR_ZORN_TEMPLATE = [
  'filePath',
  'identifierName',
] as const satisfies GenericZorn2Template;
type ExportLocatorZornTemplate = typeof EXPORT_LOCATOR_ZORN_TEMPLATE;

export class ExportLocatorZorn extends Zorn2<ExportLocatorZornTemplate> {
  static fromLocator(locator: ExportLocator): ExportLocatorZorn {
    return new ExportLocatorZorn({
      filePath: locator.filePath,
      identifierName: locator.identifierName,
    });
  }

  get rawTemplate(): ExportLocatorZornTemplate {
    return EXPORT_LOCATOR_ZORN_TEMPLATE;
  }
}
