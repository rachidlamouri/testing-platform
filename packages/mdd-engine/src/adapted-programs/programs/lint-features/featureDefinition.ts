import { z } from 'zod';
import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { FeatureId } from '../../../package-agnostic-utilities/feature-id/featureId';

export const FeatureDefinitionInputSchema = z.object({
  localId: z.string(),
  globalId: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
});

type FeatureDefinitionInput = z.infer<typeof FeatureDefinitionInputSchema>;

/**
 * A parsed object from features.yaml
 */
export class FeatureDefinition
  implements Omit<FeatureDefinitionInput, 'localId' | 'globalId'>
{
  id: FeatureId;

  name: string;

  description: string;

  createdAt: string;

  constructor(input: FeatureDefinitionInput) {
    this.id = new FeatureId({
      localId: input.localId,
      globalId: input.globalId,
    });

    this.name = input.name;
    this.description = input.description;
    this.createdAt = input.createdAt;
  }
}

export const FEATURE_DEFINITION_COLLECTION_ID = 'feature-definition';

type FeatureDefinitionCollectionId = typeof FEATURE_DEFINITION_COLLECTION_ID;

export type FeatureDefinitionStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    FeatureDefinitionCollectionId,
    FeatureDefinition
  >;
