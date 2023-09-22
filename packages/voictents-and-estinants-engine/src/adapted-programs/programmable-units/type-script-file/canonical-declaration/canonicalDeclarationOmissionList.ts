import { LintAssertionZorn } from '../../linting/lintAssertion';
import {
  LintAssertionOmission,
  LintAssertionOmissionInstance,
} from '../../linting/lintAssertionOmission';
import { FileSourceInstance } from '../../linting/source/fileSource';
import { typeScriptFileHasCanonicalDeclarationRule } from './assertTypeScriptFileHasCanonicalDeclaration';

const omitterSource = new FileSourceInstance({
  filePath: __filename,
});

// TODO: audit this list
export const canonicalDeclarationOmissionList: LintAssertionOmission[] = [
  'packages/voictents-and-estinants-engine/src/core/engine/inMemoryOdeshinVoictent2.ts',
  'packages/voictents-and-estinants-engine/src/core/engine-shell/appreffinge/outputApreffinge.ts',
  'packages/voictents-and-estinants-engine/src/core/engine-shell/estinant/estinant.ts',
  'packages/voictents-and-estinants-engine/src/core/engine-shell/estinant/tropoignant.ts',
  'packages/voictents-and-estinants-engine/src/core/internal/platomity.ts',
  'packages/voictents-and-estinants-engine/src/adapter/estinant-builder/estinantBuilder.ts',
  'packages/voictents-and-estinants-engine/src/adapter/estinant-builder/shared/estinantBuilderContext.ts',
  'packages/voictents-and-estinants-engine/src/adapter/estinant-builder/shared/partialAppreffinge.ts',
  'packages/voictents-and-estinants-engine/src/adapter/estinant-builder/shared/vicken.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/engine-program/input-output/engineEstinantInput2.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/engine-program/input-output/engineEstinantOutput2.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/error/programError.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/graph-visualization/directed-graph/types.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/in-memory-cache/abstractInMemoryVoictent2.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/type-script-file-relationships/getDirectoryInstanceIdByFilePath.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programs/categorize-files/categorizeFiles.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programs/comments-example/commentsExample.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programs/find-unused-exports/findUnusedExports.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programs/get-snapshot-refresh-script/getSnapshotRefreshScript.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programs/model-ci/ciModel.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programs/model-ci/modelCi.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programs/model-programs/modelPrograms.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-knowledge-graph/app/browser/dynamicComponentTypes.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-knowledge-graph/app/browser/factProps.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-knowledge-graph/renderKnowledgeGraph.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-type-script-file-relationships/renderTypeScriptFileRelationships.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programs/scaffold-file/assembleScaffoldedFile.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programs/scaffold-file/types.ts',
  'packages/voictents-and-estinants-engine/src/adapted-programs/programs/test-graph-render/testGraphRender.ts',
  'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testEstinantError.ts',
  'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningOneToMany.ts',
  'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningOneToOne.ts',
  'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningOneToVoictent.ts',
  'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningVoictentToVoictent.ts',
  'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testReleasingALeftVoictentMultipleTimes.ts',
  'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testReleasingARightVoictentMultipleTimes.ts',
  'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testUntriggeredCologyError.ts',
  'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testVoictentInput.ts',
  'packages/voictents-and-estinants-engine/src/core-programs/testBuildAddMetadataForSerialization.ts',
  'packages/voictents-and-estinants-engine/src/core-programs/testCachedOnDiskDatum.ts',
  'packages/voictents-and-estinants-engine/src/core-programs/testErrorSerialization.ts',
  'packages/voictents-and-estinants-engine/src/core-programs/testGetCustomTypedDatum.ts',
  'packages/voictents-and-estinants-engine/src/core-programs/testGetTypeScriptTypedDatum.ts',
  'packages/voictents-and-estinants-engine/src/core-programs/testJsonSerialization.ts',
  'packages/voictents-and-estinants-engine/src/core-programs/testSerialize.ts',
  'packages/voictents-and-estinants-engine/src/utilities/constructor-function/constructorFunctionBuilder.ts',
  'packages/voictents-and-estinants-engine/src/utilities/constructor-function/namedConstructorFunctionBuilder.ts',
  'packages/voictents-and-estinants-engine/src/utilities/constructor-function/types.ts',
  'packages/voictents-and-estinants-engine/src/utilities/file/getNestedFilePaths.ts',
  'packages/voictents-and-estinants-engine/src/utilities/serializeRuntimeStatistic.ts',
  'packages/voictents-and-estinants-engine/src/utilities/type-script-ast/flattenIdentifiableCallExpressionChain.ts',
  'packages/voictents-and-estinants-engine/src/utilities/type-script-ast/isConstantTypeScriptAsExpression.ts',
  'packages/voictents-and-estinants-engine/src/utilities/type-script-ast/isObjectLiteralExpressionWithIdentifierProperties.ts',
  'packages/voictents-and-estinants-engine/src/utilities/typed-datum/type-script/function.ts',
  'packages/voictents-and-estinants-engine/src/utilities/typed-datum/type-script/object.ts',
].map((filePath) => {
  return new LintAssertionOmissionInstance({
    omitterSource,
    omittedAssertionZorn: new LintAssertionZorn({
      rule: typeScriptFileHasCanonicalDeclarationRule,
      lintSource: new FileSourceInstance({
        filePath,
      }),
    }),
  });
});
