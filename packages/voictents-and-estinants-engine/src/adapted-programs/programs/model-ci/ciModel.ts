import { StandardInMemoryVoque } from '../../../layer-agnostic-utilities/voque/inMemoryVoque';

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
 * @canonical
 */
type CiModel = {
  zorn: string;
  initialCommandList: string[];
  finalCommandList: string[];
  programTestGroupList: ProgramTestGroup[];
};

export const CI_MODEL_GEPP = 'ci-model';

type CiModelGepp = typeof CI_MODEL_GEPP;

export type CiModelVoque = StandardInMemoryVoque<CiModelGepp, CiModel>;

export const CI_MODEL_ZORN = 'CI_MODEL';

export const CI_MODEL: CiModel = {
  zorn: CI_MODEL_ZORN,
  initialCommandList: ['set -e', '', 'echo "Starting ci.sh"', PRINT_NEW_LINE],
  finalCommandList: ['echo "Finished without errors!"'],
  programTestGroupList: [
    {
      description: 'JSON and Error Serialization',
      programTestList: [
        {
          programName: 'test-json-serialization',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/testJsonSerialization.test.sh',
        },
        {
          programName: 'test-error-serialization',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/testErrorSerialization.test.sh',
        },
      ],
    },
    {
      description: 'Core Engine Behavior',
      programTestList: [
        {
          programName: 'test-build-add-metadata-for-serialization',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/testBuildAddMetadataForSerialization.test.sh',
        },
        {
          programName: 'test-estinant-error',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testEstinantError.test.sh',
        },
        {
          programName: 'test-voictent-input',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testVoictentInput.test.sh',
        },
        {
          programName: 'test-joining-one-to-one',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningOneToOne.test.sh',
        },
        {
          programName: 'test-joining-one-to-many',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningOneToMany.test.sh',
        },
        {
          programName: 'test-joining-one-to-voictent',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningOneToVoictent.test.sh',
        },
        {
          programName: 'test-joining-voictent-to-voictent',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningVoictentToVoictent.test.sh',
        },
        {
          programName: 'test-releasing-a-left-voictent-multiple-times',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testReleasingALeftVoictentMultipleTimes.test.sh',
        },
        {
          programName: 'test-releasing-a-right-voictent-multiple-times',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testReleasingARightVoictentMultipleTimes.test.sh',
        },
        {
          programName: 'test-untriggered-cology-error',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testUntriggeredCologyError.test.sh',
        },
      ],
    },
    {
      description: 'Core Programs',
      programTestList: [
        {
          programName: 'test-get-type-script-typed-datum',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/testGetTypeScriptTypedDatum.test.sh',
        },
        {
          programName: 'test-get-custom-typed-datum',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/testGetCustomTypedDatum.test.sh',
        },
        {
          programName: 'test-serialize',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/testSerialize.test.sh',
        },
      ],
    },
    {
      description: 'Adapted Programs',
      programTestList: [
        {
          programName: 'categorize-files',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/categorize-files/categorizeFiles.test.sh',
        },
        {
          programName: 'test-graph-render',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/test-graph-render/testGraphRender.test.sh',
        },
        {
          programName: 'model-programs',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/model-programs/modelPrograms.test.sh',
        },
        {
          programName: 'find-unused-exports',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/find-unused-exports/findUnusedExports.test.sh',
        },
        {
          programName: 'model-ci',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/model-ci/modelCi.test.sh',
        },
      ],
    },
    {
      description: 'WIP Adapted Programs',
      programTestList: [
        {
          programName: 'render-knowledge-graph',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-knowledge-graph/renderKnowledgeGraph.test.sh',
        },
        {
          programName: 'develop-knowledge-graph',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/develop-knowledge-graph/developKnowledgeGraph.test.sh',
        },
        {
          programName: 'render-type-script-file-relationships',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-type-script-file-relationships/renderTypeScriptFileRelationships.test.sh',
        },
        {
          programName: 'assemble-scaffolded-file',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/scaffold-file/assembleScaffoldedFile.test.sh',
        },
        {
          programName: 'comments-example',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/comments-example/commentsExample.test.sh',
        },
        {
          programName: 'get-snapshot-refresh-script',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/get-snapshot-refresh-script/getSnapshotRefreshScript.test.sh',
        },
        {
          programName: 'test-cached-on-disk-datum',
          testFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/testCachedOnDiskDatum.test.sh',
        },
      ],
    },
  ],
};
