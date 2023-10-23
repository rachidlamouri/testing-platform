import { StandardInMemoryStreamMetatype } from '../../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';

const PRINT_NEW_LINE = 'printf "\\n"';

type ProgramTest = {
  programName: string;
  testFilePath: string;
};

type ProgramTestGroup = {
  description: string;
  programTestList: ProgramTest[];
};

/**
 * The information needed to build the expected ci.sh file
 *
 * @canonicalDeclaration
 */
type CiModel = {
  id: string;
  initialCommandList: string[];
  finalCommandList: string[];
  programTestGroupList: ProgramTestGroup[];
};

export const CI_MODEL_COLLECTION_ID = 'ci-model';

type CiModelCollectionId = typeof CI_MODEL_COLLECTION_ID;

export type CiModelStreamMetatype = StandardInMemoryStreamMetatype<
  CiModelCollectionId,
  CiModel
>;

export const CI_MODEL_ID = 'CI_MODEL';

export const CI_MODEL: CiModel = {
  id: CI_MODEL_ID,
  initialCommandList: ['set -e', '', 'echo "Starting ci.sh"', PRINT_NEW_LINE],
  finalCommandList: ['echo "Finished without errors!"'],
  programTestGroupList: [
    {
      description: 'JSON and Error Serialization',
      programTestList: [
        {
          programName: 'test-json-serialization',
          testFilePath:
            'packages/mdd-engine/src/core-programs/testJsonSerialization.test.sh',
        },
        {
          programName: 'test-error-serialization',
          testFilePath:
            'packages/mdd-engine/src/core-programs/testErrorSerialization.test.sh',
        },
      ],
    },
    {
      description: 'Core Engine Behavior',
      programTestList: [
        {
          programName: 'test-build-add-metadata-for-serialization',
          testFilePath:
            'packages/mdd-engine/src/core-programs/testBuildAddMetadataForSerialization.test.sh',
        },
        {
          programName: 'test-programmed-transform-error',
          testFilePath:
            'packages/mdd-engine/src/core-programs/engine-behavior/testProgrammedTransformError.test.sh',
        },
        {
          programName: 'test-collection-input',
          testFilePath:
            'packages/mdd-engine/src/core-programs/engine-behavior/testCollectionInput.test.sh',
        },
        {
          programName: 'test-joining-one-to-one',
          testFilePath:
            'packages/mdd-engine/src/core-programs/engine-behavior/testJoiningOneToOne.test.sh',
        },
        {
          programName: 'test-joining-one-to-many',
          testFilePath:
            'packages/mdd-engine/src/core-programs/engine-behavior/testJoiningOneToMany.test.sh',
        },
        {
          programName: 'test-joining-one-to-collection',
          testFilePath:
            'packages/mdd-engine/src/core-programs/engine-behavior/testJoiningOneToCollection.test.sh',
        },
        {
          programName: 'test-joining-collection-to-collection',
          testFilePath:
            'packages/mdd-engine/src/core-programs/engine-behavior/testJoiningCollectionToCollection.test.sh',
        },
        {
          programName: 'test-releasing-a-left-collection-multiple-times',
          testFilePath:
            'packages/mdd-engine/src/core-programs/engine-behavior/testReleasingALeftCollectionMultipleTimes.test.sh',
        },
        {
          programName: 'test-releasing-a-right-collection-multiple-times',
          testFilePath:
            'packages/mdd-engine/src/core-programs/engine-behavior/testReleasingARightCollectionMultipleTimes.test.sh',
        },
        {
          programName: 'test-untriggered-transform-input-key-group-error',
          testFilePath:
            'packages/mdd-engine/src/core-programs/engine-behavior/testUntriggeredTransformInputKeyGroupError.test.sh',
        },
      ],
    },
    {
      description: 'Core Programs',
      programTestList: [
        {
          programName: 'test-get-type-script-typed-datum',
          testFilePath:
            'packages/mdd-engine/src/core-programs/testGetTypeScriptTypedDatum.test.sh',
        },
        {
          programName: 'test-get-custom-typed-datum',
          testFilePath:
            'packages/mdd-engine/src/core-programs/testGetCustomTypedDatum.test.sh',
        },
        {
          programName: 'test-serialize',
          testFilePath:
            'packages/mdd-engine/src/core-programs/testSerialize.test.sh',
        },
      ],
    },
    {
      description: 'Adapted Programs',
      programTestList: [
        {
          programName: 'categorize-files',
          testFilePath:
            'packages/mdd-engine/src/adapted-programs/programs/categorize-files/categorizeFiles.test.sh',
        },
        {
          programName: 'test-graph-assembly',
          testFilePath:
            'packages/mdd-engine/src/adapted-programs/programs/test-graph-assembly/testGraphAssembly.test.sh',
        },
        {
          programName: 'model-programs',
          testFilePath:
            'packages/mdd-engine/src/adapted-programs/programs/model-programs/modelPrograms.test.sh',
        },
        {
          programName: 'find-unused-exports',
          testFilePath:
            'packages/mdd-engine/src/adapted-programs/programs/find-unused-exports/findUnusedExports.test.sh',
        },
        {
          programName: 'model-ci',
          testFilePath:
            'packages/mdd-engine/src/adapted-programs/programs/model-ci/modelCi.test.sh',
        },
        {
          programName: 'lint-file-system-node-path-literals',
          testFilePath:
            'packages/mdd-engine/src/adapted-programs/programs/lint-file-system-node-path-literals/lintFileSystemNodePathLiterals.test.sh',
        },
        {
          programName: 'lint-nonsense',
          testFilePath:
            'packages/mdd-engine/src/adapted-programs/programs/lint-nonsense/lintNonsense.test.sh',
        },
        {
          programName: 'rename-nonsense',
          testFilePath:
            'packages/mdd-engine/src/adapted-programs/programs/rename-nonsense/renameNonsense.test.sh',
        },
      ],
    },
    {
      description: 'WIP Adapted Programs',
      programTestList: [
        {
          programName: 'render-knowledge-graph',
          testFilePath:
            'packages/mdd-engine/src/adapted-programs/programs/render-knowledge-graph/renderKnowledgeGraph.test.sh',
        },
        {
          programName: 'develop-knowledge-graph',
          testFilePath:
            'packages/mdd-engine/src/adapted-programs/programs/develop-knowledge-graph/developKnowledgeGraph.test.sh',
        },
        {
          programName: 'assemble-scaffolded-file',
          testFilePath:
            'packages/mdd-engine/src/adapted-programs/programs/scaffold-file/assembleScaffoldedFile.test.sh',
        },
        {
          programName: 'comments-example',
          testFilePath:
            'packages/mdd-engine/src/adapted-programs/programs/comments-example/commentsExample.test.sh',
        },
        {
          programName: 'get-snapshot-refresh-script',
          testFilePath:
            'packages/mdd-engine/src/adapted-programs/programs/get-snapshot-refresh-script/getSnapshotRefreshScript.test.sh',
        },
        {
          programName: 'test-cached-on-disk-datum',
          testFilePath:
            'packages/mdd-engine/src/core-programs/testCachedOnDiskDatum.test.sh',
        },
      ],
    },
  ],
};
