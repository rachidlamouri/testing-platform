import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';

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

export type ExportLocatorInput = {
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
  }
}

export const EXPORT_LOCATOR_COLLECTION_ID = 'export-locator';

type ExportLocatorCollectionId = typeof EXPORT_LOCATOR_COLLECTION_ID;

export type ExportLocatorStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    ExportLocatorCollectionId,
    ExportLocator
  >;
