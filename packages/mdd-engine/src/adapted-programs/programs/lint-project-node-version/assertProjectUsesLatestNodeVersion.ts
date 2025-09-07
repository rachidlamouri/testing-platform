import { posix } from 'path';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  LINT_ASSERTION_COLLECTION_ID,
  LintAssertion,
  LintAssertionStreamMetatype,
} from '../../programmable-units/linting/lintAssertion';
import { TypedRule } from '../../programmable-units/linting/rule';
import { ProgrammedTransformSourceInstance } from '../../programmable-units/linting/source/programmedTransformSource';
import {
  PROJECT_NODE_VERSION_MODEL_COLLECTION_ID,
  ProjectNodeVersionModel,
  ProjectNodeVersionModelStreamMetatype,
} from './projectNodeVersionModel';

const PROGRAMMED_TRANSFORM_NAME = 'assertProjectUsesLatestNodeVersion' as const;
const ruleSource = new ProgrammedTransformSourceInstance({
  programmedTransformName: PROGRAMMED_TRANSFORM_NAME,
  filePath: posix.relative('', __filename),
});

type MessageContext = { projectNodeVersionModel: ProjectNodeVersionModel };
const rule = new TypedRule<MessageContext>({
  name: 'project-uses-latest-node-version',
  source: ruleSource,
  description:
    "Checks that the repository's node version matches the latest long term support version",
  getErrorMessage: ({ projectNodeVersionModel }): string => {
    return `Project node version "${projectNodeVersionModel.projectVersion}" does not match latest long term support version "${projectNodeVersionModel.latestLongTermSupportVersion}"`;
  },
});

/**
 * Compares the project's node version to the latest long term support version.
 */
export const assertProjectUsesLatestNodeVersion = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromItem2<ProjectNodeVersionModelStreamMetatype>({
    collectionId: PROJECT_NODE_VERSION_MODEL_COLLECTION_ID,
  })
  .toItem2<LintAssertionStreamMetatype>({
    collectionId: LINT_ASSERTION_COLLECTION_ID,
  })
  .onTransform((projectNodeVersionModel) => {
    return new LintAssertion({
      rule,
      lintSource: projectNodeVersionModel.nodeVersionManagerRunCommands.source,
      isValid:
        projectNodeVersionModel.projectVersion ===
        projectNodeVersionModel.latestLongTermSupportVersion,
      errorMessageContext: {
        projectNodeVersionModel,
      },
      context: {
        nodeVersion: projectNodeVersionModel,
      },
    });
  })
  .assemble();
