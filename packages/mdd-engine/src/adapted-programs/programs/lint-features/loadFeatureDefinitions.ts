import fs from 'fs';
import yaml from 'yaml';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  FEATURE_DEFINITION_COLLECTION_ID,
  FeatureDefinition,
  FeatureDefinitionStreamMetatype,
} from './featureDefinition';
import {
  NULL_PLACEHOLDER_COLLECTION_ID,
  NullPlaceholderStreamMetatype,
} from './nullPlaceholder';
import {
  LINT_ASSERTION_COLLECTION_ID,
  LintAssertion,
  LintAssertionStreamMetatype,
} from '../../programmable-units/linting/lintAssertion';
import { TypedRule } from '../../programmable-units/linting/rule';
import { ProgrammedTransformSourceInstance } from '../../programmable-units/linting/source/programmedTransformSource';
import { FileSourceInstance } from '../../programmable-units/linting/source/fileSource';
import { uuidToLocalId } from '../../../package-agnostic-utilities/feature-id/featureId';
import {
  SerializedFeatureDefinition,
  SerializedFeatureDefinitionById,
  SerializedFeatureDefinitionByIdSchema,
} from './serializedFeatureDefinition';
import { isNotUndefined } from '../../../package-agnostic-utilities/nil/isNotUndefined';

const PROGRAMMED_TRANSFORM_NAME = 'loadFeatureDefinitions' as const;

type FeatureDefinitionKeyIsConsistentRuleMessageContext = {
  indexKey: string;
  localId: string;
  globalId: string;
  expectedLocalId: string;
};
const featureDefinitionKeyIsConsistentRule =
  new TypedRule<FeatureDefinitionKeyIsConsistentRuleMessageContext>({
    name: 'feature-definition-key-is-consistent',
    source: new ProgrammedTransformSourceInstance({
      filePath: __filename,
      programmedTransformName: PROGRAMMED_TRANSFORM_NAME,
    }),
    description: 'All feature definitions must have valid key pairs',
    getErrorMessage: ({
      indexKey,
      localId,
      globalId,
      expectedLocalId,
    }): string => {
      return `Invalid feature definition key/id: Expected index key and local id "${expectedLocalId}" for global id "${globalId}", but received index key "${indexKey}" and local id "${localId}"`;
    },
  });

/**
 * Parses features.yaml
 */
export const loadFeatureDefinitions = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromCollection2<NullPlaceholderStreamMetatype>({
    collectionId: NULL_PLACEHOLDER_COLLECTION_ID,
  })
  .toItemTuple2<FeatureDefinitionStreamMetatype>({
    collectionId: FEATURE_DEFINITION_COLLECTION_ID,
  })
  .toItemTuple2<LintAssertionStreamMetatype>({
    collectionId: LINT_ASSERTION_COLLECTION_ID,
  })
  .onTransform(() => {
    const featuresText = fs.readFileSync(
      'packages/mdd-engine/features.yaml',
      'utf8',
    );
    const rawFeaturesInput: unknown = yaml.parse(featuresText);
    const featuresInput =
      SerializedFeatureDefinitionByIdSchema.parse(rawFeaturesInput);

    const flattenSerializedDefinitions = (
      serializedDefinitionById: SerializedFeatureDefinitionById,
      accumulator: Map<string, SerializedFeatureDefinition>,
    ): void => {
      Object.entries(serializedDefinitionById).forEach(
        ([localId, serializedDefinition]) => {
          if (serializedDefinition.children) {
            flattenSerializedDefinitions(
              serializedDefinition.children,
              accumulator,
            );
          }

          if (accumulator.has(localId)) {
            throw new Error(`Duplicate local id ${localId}`);
          }

          accumulator.set(localId, serializedDefinition);
        },
      );
    };

    const serializedDefinitionMap = new Map<
      string,
      SerializedFeatureDefinition
    >();
    flattenSerializedDefinitions(featuresInput, serializedDefinitionMap);

    const assertionDataList = [...serializedDefinitionMap.entries()].map(
      ([indexKey, featureInput]) => {
        const expectedLocalId = uuidToLocalId(featureInput.globalId);

        return {
          indexKey,
          featureInput,
          assertion: new LintAssertion({
            rule: featureDefinitionKeyIsConsistentRule,
            lintSource: new FileSourceInstance({
              filePath: 'packages/mdd-engine/features.yaml',
            }),
            context: {
              indexKey,
              featureInput,
            },
            errorMessageContext: {
              expectedLocalId,
              indexKey,
              localId: featureInput.localId,
              globalId: featureInput.globalId,
            },
            isValid:
              indexKey === expectedLocalId &&
              featureInput.localId === expectedLocalId,
          }),
        };
      },
    );

    const definitionMap = new Map<string, FeatureDefinition>();
    const features = assertionDataList
      .filter(({ assertion }) => assertion.result.isValid)
      .map(({ featureInput }) => {
        const childFeatures = Object.keys(featureInput.children ?? {})
          .map((key) => {
            return definitionMap.get(key);
          })
          .filter(isNotUndefined);

        const feature = new FeatureDefinition({
          ...featureInput,
          children: childFeatures,
        });

        definitionMap.set(feature.id.local, feature);

        return feature;
      });

    const assertions = assertionDataList.map(({ assertion }) => assertion);

    return {
      [FEATURE_DEFINITION_COLLECTION_ID]: features,
      [LINT_ASSERTION_COLLECTION_ID]: assertions,
    };
  })
  .assemble();
