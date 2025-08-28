import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  LINT_ASSERTION_COLLECTION_ID,
  LintAssertion,
  LintAssertionStreamMetatype,
} from '../../programmable-units/linting/lintAssertion';
import { TypedRule } from '../../programmable-units/linting/rule';
import { FileSourceInstance } from '../../programmable-units/linting/source/fileSource';
import { ProgrammedTransformSourceInstance } from '../../programmable-units/linting/source/programmedTransformSource';
import {
  FEATURE_DEFINITION_COLLECTION_ID,
  FeatureDefinitionStreamMetatype,
} from './featureDefinition';
import {
  FEATURE_IMPLEMENTATION_COLLECTION_ID,
  FeatureImplementationId,
  FeatureImplementationStreamMetatype,
} from './featureImplementation';

const PROGRAMMED_TRANSFORM_NAME = 'getFeatureLintAssertions' as const;

type FeatureIsImplementedMessageContext = {
  localId: string;
  title: string;
};
const featureIsImplemented = new TypedRule<FeatureIsImplementedMessageContext>({
  name: 'feature-is-implemented',
  source: new ProgrammedTransformSourceInstance({
    filePath: __filename,
    programmedTransformName: PROGRAMMED_TRANSFORM_NAME,
  }),
  description: 'All features must be implemented',
  getErrorMessage: ({ localId, title }): string => {
    return `Feature "${localId}" "${title}" is not implemented`;
  },
});

/**
 * Verifies that all features have an implementation
 */
export const getFeatureLintAssertions = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromItem2<FeatureDefinitionStreamMetatype>({
    collectionId: FEATURE_DEFINITION_COLLECTION_ID,
  })
  .andFromCollection2<FeatureImplementationStreamMetatype>({
    collectionId: FEATURE_IMPLEMENTATION_COLLECTION_ID,
  })
  .toItem2<LintAssertionStreamMetatype>({
    collectionId: LINT_ASSERTION_COLLECTION_ID,
  })
  .onTransform((featureDefinition, implementations) => {
    return new LintAssertion({
      rule: featureIsImplemented,
      // TODO: add a uniquely identifiable source class
      lintSource: new FileSourceInstance({
        filePath: `packages/mdd-engine/features.yaml ${featureDefinition.id.local}`,
      }),
      isValid: implementations.byId.has(
        new FeatureImplementationId({
          localFeatureId: featureDefinition.id.local,
        }).forHuman,
      ),
      errorMessageContext: {
        localId: featureDefinition.id.local,
        title: featureDefinition.title,
      },
      context: {
        featureDefinition,
      },
    });
  })
  .assemble();
