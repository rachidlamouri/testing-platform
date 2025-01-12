import { z } from 'zod';
import { Simplify } from 'type-fest';

const BaseSerializedFeatureDefinitionSchema = z.object({
  localId: z.string(),
  globalId: z.string(),
  // TODO: rename "name" tot title
  title: z.string(),
  description: z.string(),
  createdAt: z.string(),
});

export type BaseSerializedFeatureDefinition = z.infer<
  typeof BaseSerializedFeatureDefinitionSchema
>;

export const SerializedFeatureDefinitionByIdSchema = z.lazy(() => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return z.record(z.string(), SerializedFeatureDefinitionSchema);
});

export type SerializedFeatureDefinitionById = z.infer<
  typeof SerializedFeatureDefinitionByIdSchema
>;

/**
 * Structure of feature entries in features.yaml
 */
export type SerializedFeatureDefinition = Simplify<
  BaseSerializedFeatureDefinition & {
    children?: SerializedFeatureDefinitionById;
  }
>;

const SerializedFeatureDefinitionSchema: z.ZodType<SerializedFeatureDefinition> =
  BaseSerializedFeatureDefinitionSchema.extend({
    children: SerializedFeatureDefinitionByIdSchema.optional(),
  });
