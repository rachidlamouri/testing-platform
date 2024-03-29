import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';
import {
  ExportedIdentifierSource,
  ExportedIdentifierSourceInstance,
} from '../linting/source/exportedIdentifierSource';

const EXPORT_LOCATOR_ID_TEMPLATE = [
  'distinguisher',
  'filePath',
  'identifierName',
] as const satisfies GenericComplexIdTemplate;
type ExportLocatorIdTemplate = typeof EXPORT_LOCATOR_ID_TEMPLATE;
export class ExportLocatorId extends ComplexId<ExportLocatorIdTemplate> {
  get rawTemplate(): ExportLocatorIdTemplate {
    return EXPORT_LOCATOR_ID_TEMPLATE;
  }
}

type ExportLocatorInput = {
  IdConstructor: typeof ExportLocatorId;
  distinguisher: string;
  filePath: string;
  identifierName: string;
};

export type ExportLocatorSubclassInput = Omit<
  ExportLocatorInput,
  'IdConstructor' | 'distinguisher'
>;

/**
 * The information needed to find an export declaration from a specific file
 */
export class ExportLocator
  implements Omit<ExportLocatorInput, 'IdConstructor'>
{
  id: ExportLocatorId;

  distinguisher: string;

  filePath: string;

  identifierName: string;

  locateeSource: ExportedIdentifierSource;

  constructor(input: ExportLocatorInput) {
    const { IdConstructor, distinguisher, filePath, identifierName } = input;

    this.id = new IdConstructor({
      distinguisher,
      filePath,
      identifierName,
    });
    this.distinguisher = input.distinguisher;
    this.filePath = input.filePath;
    this.identifierName = input.identifierName;
    this.locateeSource = new ExportedIdentifierSourceInstance({
      filePath: input.filePath,
      exportedIdentifier: input.identifierName,
    });
  }
}
