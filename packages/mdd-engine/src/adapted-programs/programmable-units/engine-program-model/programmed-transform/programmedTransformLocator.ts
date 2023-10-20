import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { ExportLocator, ExportLocatorSubclassInput } from '../exportLocator';
import { ProgrammedTransformId } from './programmedTransformId';

type ItemDefinitionLocatorInput = ExportLocatorSubclassInput;

export class ProgrammedTransformLocator extends ExportLocator {
  constructor(input: ItemDefinitionLocatorInput) {
    super({
      IdConstructor: ProgrammedTransformId,
      distinguisher: 'ProgrammedTransfrom',
      ...input,
    });
  }
}

export const PROGRAMMED_TRANSFORM_LOCATOR_COLLECTION_ID =
  'programmed-transform-locator';

type ProgrammedTransformLocatorCollectionId =
  typeof PROGRAMMED_TRANSFORM_LOCATOR_COLLECTION_ID;

export type ProgrammedTransformLocatorStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ProgrammedTransformLocatorCollectionId,
    ProgrammedTransformLocator
  >;
