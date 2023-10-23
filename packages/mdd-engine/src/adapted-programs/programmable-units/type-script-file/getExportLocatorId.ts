import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';

type ExportLocator = {
  filePath: string;
  identifierName: string;
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
