import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { LocalFeatureId } from '../../../package-agnostic-utilities/feature-id/featureId';
import {
  LINT_ASSERTION_COLLECTION_ID,
  LintAssertion,
  LintAssertionStreamMetatype,
} from '../../programmable-units/linting/lintAssertion';
import { TypedRule } from '../../programmable-units/linting/rule';
import { FileSourceInstance } from '../../programmable-units/linting/source/fileSource';
import { ProgrammedTransformSourceInstance } from '../../programmable-units/linting/source/programmedTransformSource';
import { CommentTagId } from '../../programmable-units/type-script-file/comment/commentTagId';
import {
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  FileCommentedProgramBodyDeclarationGroupStreamMetatype,
} from '../../programmable-units/type-script-file/fileCommentedProgramBodyDeclarationGroup';
import {
  FEATURE_DEFINITION_COLLECTION_ID,
  FeatureDefinitionStreamMetatype,
} from './featureDefinition';
import {
  FEATURE_IMPLEMENTATION_COLLECTION_ID,
  FeatureImplementation,
  FeatureImplementationStreamMetatype,
} from './featureImplementation';

const PROGRAMMED_TRANSFORM_NAME = 'getFeatureImplementations' as const;

type ImplementationReferencesRealFeatureMessageContext = {
  filePath: string;
  invalidLocalId: string;
};
const implementationReferencesRealFeature =
  new TypedRule<ImplementationReferencesRealFeatureMessageContext>({
    name: 'implementation-references-real-feature',
    source: new ProgrammedTransformSourceInstance({
      filePath: __filename,
      programmedTransformName: PROGRAMMED_TRANSFORM_NAME,
    }),
    description:
      'Feature implementations must reference local feature ids in features.yaml',
    getErrorMessage: ({ filePath, invalidLocalId }): string => {
      return `File "${filePath}" implements feature "${invalidLocalId}" that does not exist.`;
    },
  });

/**
 * Finds all "implements" annotations
 */
export const getFeatureImplementations = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromItem2<FileCommentedProgramBodyDeclarationGroupStreamMetatype>({
    collectionId: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  })
  .andFromCollection2<FeatureDefinitionStreamMetatype>({
    collectionId: FEATURE_DEFINITION_COLLECTION_ID,
  })
  .toItemTuple2<FeatureImplementationStreamMetatype>({
    collectionId: FEATURE_IMPLEMENTATION_COLLECTION_ID,
  })
  .toItemTuple2<LintAssertionStreamMetatype>({
    collectionId: LINT_ASSERTION_COLLECTION_ID,
  })
  .onTransform((file, definitions) => {
    const implementationTag = (file.canonicalComment?.tagTuple ?? []).find(
      ({ tag }) => tag === CommentTagId.Implements,
    );

    if (implementationTag === undefined) {
      return {
        [FEATURE_IMPLEMENTATION_COLLECTION_ID]: [],
        [LINT_ASSERTION_COLLECTION_ID]: [],
      };
    }

    const localFeatureIds = implementationTag.raw
      .split(',')
      .map((id) => id.trim());

    const implementations = localFeatureIds.map((localFeatureId) => {
      return new FeatureImplementation({
        source: new FileSourceInstance({
          filePath: file.filePathObject.serialized,
        }),
        localFeatureId,
      });
    });

    const assertions = implementations.map((implementation) => {
      return new LintAssertion({
        rule: implementationReferencesRealFeature,
        isValid: definitions.byId.has(
          new LocalFeatureId({
            localId: implementation.localFeatureId,
          }).forHuman,
        ),
        errorMessageContext: {
          filePath: file.filePathObject.serialized,
          invalidLocalId: implementation.localFeatureId,
        },
        context: {
          implementation,
          file,
        },
        lintSource: new FileSourceInstance({
          filePath: file.filePathObject.serialized,
        }),
      });
    });

    return {
      [FEATURE_IMPLEMENTATION_COLLECTION_ID]: implementations,
      [LINT_ASSERTION_COLLECTION_ID]: assertions,
    };
  })
  .assemble();
