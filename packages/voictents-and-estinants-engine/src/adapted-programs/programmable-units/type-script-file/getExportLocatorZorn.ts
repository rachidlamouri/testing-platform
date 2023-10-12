import { getId } from '../../../layer-agnostic-utilities/deprecated-id/getId';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';

type ExportLocator = {
  filePath: string;
  identifierName: string;
};

/**
 * This is part of an outdated identifier pattern. Use the Zorn class instead.
 * @deprecated
 *
 * @readableName getExportLocatorId
 */
export const getExportLocatorZorn = (locator: ExportLocator): string => {
  return getId([locator.filePath, locator.identifierName]);
};

const EXPORT_LOCATOR_ZORN_TEMPLATE = [
  'filePath',
  'identifierName',
] as const satisfies GenericComplexIdTemplate;
type ExportLocatorZornTemplate = typeof EXPORT_LOCATOR_ZORN_TEMPLATE;

export class ExportLocatorZorn extends ComplexId<ExportLocatorZornTemplate> {
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
