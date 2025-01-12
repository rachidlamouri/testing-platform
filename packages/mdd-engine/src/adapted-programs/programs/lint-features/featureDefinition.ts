import { Merge } from 'type-fest';
import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { FeatureId } from '../../../package-agnostic-utilities/feature-id/featureId';
import { BaseSerializedFeatureDefinition } from './serializedFeatureDefinition';

type FeatureDefinitionInput = Merge<
  BaseSerializedFeatureDefinition,
  {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    children: FeatureDefinition[];
  }
>;

/**
 * A parsed object from features.yaml
 *
 * @implements EKW8
 */
export class FeatureDefinition
  implements Omit<FeatureDefinitionInput, 'localId' | 'globalId'>
{
  id: FeatureId;

  title: string;

  description: string;

  createdAt: string;

  children: FeatureDefinition[];

  constructor(input: FeatureDefinitionInput) {
    this.id = new FeatureId({
      localId: input.localId,
      globalId: input.globalId,
    });

    this.title = input.title;
    this.description = input.description;
    this.createdAt = input.createdAt;
    this.children = input.children;
  }
}

export const FEATURE_DEFINITION_COLLECTION_ID = 'feature-definition';

type FeatureDefinitionCollectionId = typeof FEATURE_DEFINITION_COLLECTION_ID;

export type FeatureDefinitionStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    FeatureDefinitionCollectionId,
    FeatureDefinition
  >;
