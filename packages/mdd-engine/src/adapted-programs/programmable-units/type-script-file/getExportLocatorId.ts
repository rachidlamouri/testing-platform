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
export const getExportLocatorId = (locator: ExportLocator): string => {
  return getId([locator.filePath, locator.identifierName]);
};

const EXPORT_LOCATOR_ID_TEMPLATE = [
  'filePath',
  'identifierName',
] as const satisfies GenericComplexIdTemplate;
type ExportLocatorIdTemplate = typeof EXPORT_LOCATOR_ID_TEMPLATE;

export class ExportLocatorId extends ComplexId<ExportLocatorIdTemplate> {
  static fromLocator(locator: ExportLocator): ExportLocatorId {
    return new ExportLocatorId({
      filePath: locator.filePath,
      identifierName: locator.identifierName,
    });
  }

  get rawTemplate(): ExportLocatorIdTemplate {
    return EXPORT_LOCATOR_ID_TEMPLATE;
  }
}
