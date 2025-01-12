import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';
import { Source } from '../../programmable-units/linting/source/source';

const FEATURE_IMPLEMENTATION_ID_TEMPLATE = [
  'localFeatureId',
] as const satisfies GenericComplexIdTemplate;
type FeatureImplementationIdTemplate =
  typeof FEATURE_IMPLEMENTATION_ID_TEMPLATE;
export class FeatureImplementationId extends ComplexId<FeatureImplementationIdTemplate> {
  get rawTemplate(): FeatureImplementationIdTemplate {
    return FEATURE_IMPLEMENTATION_ID_TEMPLATE;
  }
}

type FeatureImplementationInput = {
  source: Source;
  localFeatureId: string;
};

/**
 * A local feature id and the file that implements it
 */
export class FeatureImplementation implements FeatureImplementationInput {
  id: FeatureImplementationId;

  source: Source;

  localFeatureId: string;

  constructor(input: FeatureImplementationInput) {
    this.id = new FeatureImplementationId({
      localFeatureId: input.localFeatureId,
    });

    this.source = input.source;
    this.localFeatureId = input.localFeatureId;
  }
}

export const FEATURE_IMPLEMENTATION_COLLECTION_ID = 'feature-implementation';

type FeatureImplementationCollectionId =
  typeof FEATURE_IMPLEMENTATION_COLLECTION_ID;

export type FeatureImplementationStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    FeatureImplementationCollectionId,
    FeatureImplementation
  >;
